import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Plan } from '@core/infrastructure/entities/plan.entity';
import { Redemption } from '@core/infrastructure/entities/redemption.entity';
import { RedemptionService } from '@services/redemption.service';
import { RedemptionController } from '@app/controllers/redemption.controller';
import { Client } from '@core/infrastructure/entities/client.entity';
import { Contribution } from '@core/infrastructure/entities/contribution.entity';
import { Product } from '@core/infrastructure/entities/product.entity';
import { RedemptionRepository } from '@core/infrastructure/repositories/redemption.repository';
import { PlanRepository } from '@core/infrastructure/repositories/plan.repository';
import { ContributionRepository } from '@core/infrastructure/repositories/contribution.repository';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Redemption,
      Plan,
      Client,
      Product,
      Contribution,
    ]),
  ],
  providers: [
    RedemptionService,
    RedemptionRepository,
    PlanRepository,
    ContributionRepository,
  ],
  controllers: [RedemptionController],
})
export class RedemptionModule {}
