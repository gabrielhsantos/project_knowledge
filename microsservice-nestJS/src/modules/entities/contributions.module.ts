import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Plan } from '@core/infrastructure/entities/plan.entity';
import { Contribution } from '@core/infrastructure/entities/contribution.entity';
import { ContributionController } from '@app/controllers/contribution.controller';
import { ContributionService } from '@services/contribution.service';
import { Client } from '@core/infrastructure/entities/client.entity';
import { ContributionRepository } from '@core/infrastructure/repositories/contribution.repository';
import { ClientRepository } from '@core/infrastructure/repositories/client.repository';
import { PlanRepository } from '@core/infrastructure/repositories/plan.repository';

@Module({
  imports: [SequelizeModule.forFeature([Contribution, Plan, Client])],
  providers: [
    ContributionService,
    ContributionRepository,
    ClientRepository,
    PlanRepository,
  ],
  controllers: [ContributionController],
})
export class ContributionModule {}
