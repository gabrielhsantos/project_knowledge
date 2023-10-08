import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Contribution } from '@core/infrastructure/entities/contribution.entity';
import { IContributionRepository } from '@core/domain/interfaces/contribution.interface';

@Injectable()
export class ContributionRepository implements IContributionRepository {
  constructor(
    @InjectModel(Contribution)
    private readonly contributionModel: typeof Contribution,
  ) {}

  async findOneByUuid(uuid: string): Promise<Contribution | null> {
    return await this.contributionModel.findOne({ where: { uuid } });
  }

  async getTotalContributionByPlanId(planId: number): Promise<number> {
    return await this.contributionModel.sum('contribution', {
      where: { planId },
    });
  }

  async create(contributionData: any): Promise<Contribution> {
    return await this.contributionModel.create(contributionData);
  }
}
