import { Contribution } from '@core/infrastructure/entities/contribution.entity';

export interface IContributionRepository {
  findOneByUuid(uuid: string): Promise<Contribution | null>;
  getTotalContributionByPlanId(planId: number): Promise<number>;
  create(productData: any): Promise<Contribution>;
}
