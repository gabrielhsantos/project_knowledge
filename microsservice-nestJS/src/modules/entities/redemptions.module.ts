import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Plan } from '@core/infrastructure/entities/plan.entity';
import { PlanService } from '@services/plan.service';
import { Redemption } from '@core/infrastructure/entities/redemption.entity';
import { RedemptionService } from '@services/redemption.service';
import { RedemptionController } from '@app/controllers/redemption.controller';
import { Client } from '@core/infrastructure/entities/client.entity';
import { ClientService } from '@services/client.service';
import { ProductService } from '@services/product.service';
import { Contribution } from '@core/infrastructure/entities/contribution.entity';
import { Product } from '@core/infrastructure/entities/product.entity';
import { ContributionService } from '@services/contribution.service';

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
    PlanService,
    ClientService,
    ProductService,
    ContributionService,
  ],
  controllers: [RedemptionController],
})
export class RedemptionModule {}
