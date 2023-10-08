import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Plan } from '@core/infrastructure/entities/plan.entity';
import { PlanService } from '@services/plan.service';
import { PlanController } from '@app/controllers/plan.controller';
import { Client } from '@core/infrastructure/entities/client.entity';
import { Product } from '@core/infrastructure/entities/product.entity';
import { Contribution } from '@core/infrastructure/entities/contribution.entity';
import { PlanRepository } from '@core/infrastructure/repositories/plan.repository';
import { ClientRepository } from '@core/infrastructure/repositories/client.repository';
import { ProductRepository } from '@core/infrastructure/repositories/product.repository';
import { ContributionRepository } from '@core/infrastructure/repositories/contribution.repository';

@Module({
  imports: [SequelizeModule.forFeature([Plan, Client, Product, Contribution])],
  providers: [
    PlanService,
    PlanRepository,
    ClientRepository,
    ProductRepository,
    ContributionRepository,
  ],
  controllers: [PlanController],
})
export class PlanModule {}
