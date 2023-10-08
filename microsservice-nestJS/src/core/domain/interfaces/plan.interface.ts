import { Plan } from '@core/infrastructure/entities/plan.entity';
import { PlanDto } from '../dtos/plan.dto';

export interface IPlanRepository {
  findOneByUuid(uuid: string): Promise<Plan | null>;
  create(data: PlanDto): Promise<Plan>;
}
