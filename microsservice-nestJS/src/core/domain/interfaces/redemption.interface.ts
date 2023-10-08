import { Redemption } from '@core/infrastructure/entities/redemption.entity';
import { RedemptionDto } from '../dtos/redemption.dto';

export interface IRedemptionRepository {
  findOneByUuid(uuid: string): Promise<Redemption | null>;
  create(data: RedemptionDto): Promise<Redemption>;
}
