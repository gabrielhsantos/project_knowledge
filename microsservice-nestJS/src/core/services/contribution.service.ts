import { ContributionDto } from '@core/domain/dtos/contribution.dto';
import { Contribution } from '@core/infrastructure/entities/contribution.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4 } from 'uuid';
import { ClientService } from './client.service';
import { PlanService } from './plan.service';
import { NotFoundException } from '@shared/exceptions';
import { Plan } from '@core/infrastructure/entities/plan.entity';
import { UnprocessableEntityException } from '@shared/exceptions/unprocessable-entity.exception';

@Injectable()
export class ContributionService {
  constructor(
    @InjectModel(Contribution)
    private readonly contributionModel: typeof Contribution,
    private readonly clientService: ClientService,
    private readonly planService: PlanService,
  ) {}

  async create(contribution: ContributionDto): Promise<Contribution> {
    const clientUuid = contribution.clientId as string;
    const planUuid = contribution.planId as string;

    const clientDb = await this.clientService.findOneClientByUuid(clientUuid);
    if (!clientDb) throw new NotFoundException('Client not found.');

    const planDb = await this.planService.findOnePlanByUuid(planUuid);
    if (!planDb) throw new NotFoundException('Plan not found.');

    const { isValid, message } = await this.validateContribution(
      contribution,
      planDb,
    );
    if (!isValid) throw new UnprocessableEntityException(message!);

    return await this.contributionModel.create({
      uuid: uuidv4(),
      clientId: clientDb.id,
      planId: planDb.id,
      contribution: contribution.contribution,
    });
  }

  async findOneContibution(uuid: string): Promise<Contribution | null> {
    return await this.contributionModel.findOne({ where: { uuid } });
  }

  async getTotalContributionByPlanId(planId: number): Promise<number> {
    return await this.contributionModel.sum('contribution', {
      where: { planId },
    });
  }

  private async validateContribution(
    contribution: ContributionDto,
    planDb: Plan,
  ): Promise<{ isValid: boolean; message?: string }> {
    if (
      contribution.contribution < planDb.product.minimumValueExtraContribution
    ) {
      return {
        isValid: false,
        message: `Contribution does not meet the minimum value of R$${planDb.product.minimumValueExtraContribution}.`,
      };
    }

    return { isValid: true };
  }
}
