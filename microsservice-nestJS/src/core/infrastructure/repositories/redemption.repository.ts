import { IRedemptionRepository } from '@core/domain/interfaces/redemption.interface';
import { Redemption } from '@core/infrastructure/entities/redemption.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RedemptionRepository implements IRedemptionRepository {
  constructor(
    @InjectModel(Redemption)
    private readonly redemptionModel: typeof Redemption,
  ) {}

  async findOneByUuid(uuid: string): Promise<Redemption | null> {
    return await this.redemptionModel.findOne({ where: { uuid } });
  }

  async create(redemptionData: any): Promise<Redemption> {
    return await this.redemptionModel.create(redemptionData);
  }
}
