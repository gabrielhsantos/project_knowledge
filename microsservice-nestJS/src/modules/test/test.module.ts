import { Module } from '@nestjs/common';
import { TestSetupService } from '../../../test/setupTests';
import { ProductService } from '@services/product.service';
import { ClientService } from '@services/client.service';
import { PlanService } from '@services/plan.service';
import { RedemptionService } from '@services/redemption.service';
import { ContributionService } from '@services/contribution.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Client } from '@core/infrastructure/entities/client.entity';
import { Product } from '@core/infrastructure/entities/product.entity';
import { Redemption } from '@core/infrastructure/entities/redemption.entity';
import { Plan } from '@core/infrastructure/entities/plan.entity';
import { Contribution } from '@core/infrastructure/entities/contribution.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Client,
      Product,
      Plan,
      Redemption,
      Contribution,
    ]),
  ],
  providers: [
    TestSetupService,
    ClientService,
    ProductService,
    PlanService,
    RedemptionService,
    ContributionService,
  ],
})
export class TestModule {}
