import { ContributionDto } from '@core/domain/dtos/contribution.dto';
import { Contribution } from '@core/infrastructure/entities/contribution.entity';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundException } from '@shared/exceptions';
import { Plan } from '@core/infrastructure/entities/plan.entity';
import { UnprocessableEntityException } from '@shared/exceptions/unprocessable-entity.exception';
import { ContributionRepository } from '@core/infrastructure/repositories/contribution.repository';
import { PlanRepository } from '@core/infrastructure/repositories/plan.repository';
import { ClientRepository } from '@core/infrastructure/repositories/client.repository';
import { ICreateService } from '@core/domain/interfaces/service.interface';

@Injectable()
export class ContributionService
  implements ICreateService<ContributionDto, Promise<Contribution>>
{
  constructor(
    private readonly contributionRepository: ContributionRepository,
    private readonly clientRepository: ClientRepository,
    private readonly planRepository: PlanRepository,
  ) {}

  async create(contribution: ContributionDto): Promise<Contribution> {
    const clientUuid = contribution.clientId as string;
    const planUuid = contribution.planId as string;

    const clientDb = await this.clientRepository.findOneByUuid(clientUuid);
    if (!clientDb) throw new NotFoundException('Client not found.');

    const planDb = await this.planRepository.findOneByUuid(planUuid);
    if (!planDb) throw new NotFoundException('Plan not found.');

    const { isValid, message } = await this.validateContribution(
      contribution,
      planDb,
    );
    if (!isValid) throw new UnprocessableEntityException(message!);

    return await this.contributionRepository.create({
      uuid: uuidv4(),
      clientId: clientDb.id,
      planId: planDb.id,
      contribution: contribution.contribution,
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
