import { PlanDto } from '@core/domain/dtos/plan.dto';
import { Plan } from '@core/infrastructure/entities/plan.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4 } from 'uuid';
import { ClientService } from './client.service';
import { ProductService } from './product.service';
import { NotFoundException } from '@shared/exceptions';
import { Product } from '@core/infrastructure/entities/product.entity';
import { Client } from '@core/infrastructure/entities/client.entity';
import { UnprocessableEntityException } from '@shared/exceptions/unprocessable-entity.exception';
import { Contribution } from '@core/infrastructure/entities/contribution.entity';
import { getAge } from '@shared/utils/get-age';

@Injectable()
export class PlanService {
  constructor(
    @InjectModel(Plan)
    private readonly planModel: typeof Plan,
    @InjectModel(Contribution)
    private readonly contributionModel: typeof Contribution,
    private readonly clientService: ClientService,
    private readonly productService: ProductService,
  ) {}

  async create(plan: PlanDto): Promise<Plan> {
    const { clientUuid, productUuid } = plan;

    const clientDb = await this.clientService.findOneClientByUuid(clientUuid!);
    if (!clientDb) throw new NotFoundException('Client not found.');

    const productDb = await this.productService.findOneProductByUuid(
      productUuid!,
    );
    if (!productDb) throw new NotFoundException('Product not found.');

    const { isValid, message } = await this.validatePlan(
      plan,
      productDb,
      clientDb,
    );
    if (!isValid) throw new UnprocessableEntityException(message!);

    const newPlan = await this.planModel.create({
      uuid: uuidv4(),
      clientId: clientDb.id,
      productId: productDb.id,
      contribution: plan.contribution,
      subscriptionDate: plan.subscriptionDate,
      retirementAge: plan.retirementAge,
    });

    await this.contributionModel.create({
      uuid: uuidv4(),
      clientId: clientDb.id,
      planId: newPlan.id,
      contribution: plan.contribution,
    });

    return newPlan;
  }

  async findOnePlanByUuid(uuid: string): Promise<Plan | null> {
    return await this.planModel.findOne({
      where: { uuid },
      include: [{ model: Product }, { model: Client }],
    });
  }

  private async validatePlan(
    plan: PlanDto,
    productDb: Product,
    clientDb: Client,
  ): Promise<{ isValid: boolean; message?: string }> {
    const isValidEntryAge = getAge(clientDb.dob) >= productDb.entryAge;

    if (!isValidEntryAge) {
      return {
        isValid: false,
        message: 'Invalid age to purchase the plan.',
      };
    }

    const saleExpirationDate = new Date(productDb.saleExpiration);
    const subscriptionDate = new Date(plan.subscriptionDate);
    if (saleExpirationDate <= subscriptionDate) {
      return {
        isValid: false,
        message: 'Expired date for saleExpiration field.',
      };
    }

    if (plan.contribution < productDb.minimumInitialContributionValue) {
      return {
        isValid: false,
        message: `Contribution does not meet the minimum value of R$${productDb.minimumInitialContributionValue}.`,
      };
    }

    return { isValid: true };
  }
}
