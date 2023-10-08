import { PlanDto } from '@core/domain/dtos/plan.dto';
import { Plan } from '@core/infrastructure/entities/plan.entity';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundException } from '@shared/exceptions';
import { Product } from '@core/infrastructure/entities/product.entity';
import { Client } from '@core/infrastructure/entities/client.entity';
import { UnprocessableEntityException } from '@shared/exceptions/unprocessable-entity.exception';
import { getAge } from '@shared/utils/get-age';
import { ClientRepository } from '@core/infrastructure/repositories/client.repository';
import { ProductRepository } from '@core/infrastructure/repositories/product.repository';
import { PlanRepository } from '@core/infrastructure/repositories/plan.repository';
import { ContributionRepository } from '@core/infrastructure/repositories/contribution.repository';
import { ICreateService } from '@core/domain/interfaces/service.interface';

@Injectable()
export class PlanService implements ICreateService<PlanDto, Promise<Plan>> {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly productRepository: ProductRepository,
    private readonly planRepository: PlanRepository,
    private readonly contributionRepository: ContributionRepository,
  ) {}

  async create(plan: PlanDto): Promise<Plan> {
    const clientUuid = plan.clientId as string;
    const productUuid = plan.productId as string;

    const clientDb = await this.clientRepository.findOneByUuid(clientUuid);
    if (!clientDb) throw new NotFoundException('Client not found.');

    const productDb = await this.productRepository.findOneByUuid(productUuid);
    if (!productDb) throw new NotFoundException('Product not found.');

    const { isValid, message } = await this.validatePlan(
      plan,
      productDb,
      clientDb,
    );
    if (!isValid) throw new UnprocessableEntityException(message!);

    const newPlan = await this.planRepository.create({
      uuid: uuidv4(),
      clientId: clientDb.id,
      productId: productDb.id,
      contribution: plan.contribution,
      subscriptionDate: plan.subscriptionDate,
      retirementAge: plan.retirementAge,
    });

    await this.contributionRepository.create({
      uuid: uuidv4(),
      clientId: clientDb.id,
      planId: newPlan.id,
      contribution: plan.contribution,
    });

    return newPlan;
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
