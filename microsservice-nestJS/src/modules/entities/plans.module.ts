import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Plan } from '@core/infrastructure/entities/plan.entity';
import { PlanService } from '@services/plan.service';
import { PlanController } from '@app/controllers/plan.controller';
import { ClientService } from '@services/client.service';
import { Client } from '@core/infrastructure/entities/client.entity';
import { Product } from '@core/infrastructure/entities/product.entity';
import { ProductService } from '@services/product.service';
import { Contribution } from '@core/infrastructure/entities/contribution.entity';

@Module({
  imports: [SequelizeModule.forFeature([Plan, Client, Product, Contribution])],
  providers: [PlanService, ClientService, ProductService],
  controllers: [PlanController],
})
export class PlanModule {}
