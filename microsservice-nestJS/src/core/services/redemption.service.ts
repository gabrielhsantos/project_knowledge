import { RedemptionDto } from '@core/domain/dtos/redemption.dto';
import { Redemption } from '@core/infrastructure/entities/redemption.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UnprocessableEntityException } from '@shared/exceptions/unprocessable-entity.exception';
import { v4 as uuidv4 } from 'uuid';
import { PlanService } from './plan.service';
import { NotFoundException } from '@shared/exceptions/not-found.exception';
import { getAge } from '@shared/utils/get-age';
import { Plan } from '@core/infrastructure/entities/plan.entity';
import { daysBetweenDates } from '@shared/utils/get-days-between-dates';
import { ContributionService } from './contribution.service';

@Injectable()
export class RedemptionService {
  constructor(
    @InjectModel(Redemption)
    private readonly redemptionModel: typeof Redemption,
    private readonly planService: PlanService,
    private readonly contributionService: ContributionService,
  ) {}

  async create(redemption: RedemptionDto): Promise<Redemption> {
    const planUuid = redemption.planId as string;

    const planDb = await this.planService.findOnePlanByUuid(planUuid);
    if (!planDb) throw new NotFoundException('Plan not found.');

    const contributionTotal =
      await this.contributionService.getTotalContributionByPlanId(planDb.id);

    const { isValid, message } = await this.validateRedemption(
      redemption,
      planDb,
      contributionTotal,
    );
    if (!isValid) throw new UnprocessableEntityException(message!);

    const newRedemption = await this.redemptionModel.create({
      uuid: uuidv4(),
      planId: planDb.id,
      redemptionValue: redemption.redemptionValue,
    });

    return newRedemption;
  }

  async findOneRedemptionByUuid(uuid: string): Promise<Redemption | null> {
    return await this.redemptionModel.findOne({ where: { uuid } });
  }

  private async validateRedemption(
    redemption: RedemptionDto,
    planDb: Plan,
    contributionTotal: number,
  ): Promise<{ isValid: boolean; message?: string }> {
    const isValidExitAge = getAge(planDb.client.dob) >= planDb.retirementAge;
    if (!isValidExitAge) {
      return { isValid: false, message: 'Invalid age to redeem values.' };
    }

    if (
      daysBetweenDates(new Date(planDb.subscriptionDate), new Date()) <
      planDb.product.initialRescueGracePeriod
    ) {
      return { isValid: false, message: 'Invalid date to redeem values.' };
    }

    if (redemption.redemptionValue > contributionTotal) {
      return {
        isValid: false,
        message: 'Amount requested above the available redemption limit.',
      };
    }

    return { isValid: true };
  }
}
