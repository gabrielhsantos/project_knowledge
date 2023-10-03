import { PlanDto, PlanResponseDto } from '@core/domain/dtos/plan.dto';

export const planResponse = (planDB: PlanDto): PlanResponseDto => {
  return {
    id: planDB.uuid!,
  };
};
