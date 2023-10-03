import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Plan } from '@core/infrastructure/entities/plan.entity';
import { Contribution } from '@core/infrastructure/entities/contribution.entity';
import { ContributionController } from '@app/controllers/contribution.controller';
import { ContributionService } from '@services/contribution.service';
import { Client } from '@core/infrastructure/entities/client.entity';
import { ClientService } from '@services/client.service';
import { PlanService } from '@services/plan.service';
import { ProductService } from '@services/product.service';
import { Product } from '@core/infrastructure/entities/product.entity';

@Module({
  imports: [SequelizeModule.forFeature([Contribution, Plan, Client, Product])],
  providers: [ContributionService, ClientService, PlanService, ProductService],
  controllers: [ContributionController],
})
export class ContributionModule {}
