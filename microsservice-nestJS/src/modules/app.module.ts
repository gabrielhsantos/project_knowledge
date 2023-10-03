import { Module } from '@nestjs/common';
import { ConfigModule } from '@modules/env/config.module';
import { DatabaseModule } from '@modules/database/database.module';
import { ClientModule } from './entities/clients.module';
import { ProductModule } from './entities/products.module';
import { PlanModule } from './entities/plans.module';
import { ContributionModule } from './entities/contributions.module';
import { RedemptionModule } from './entities/redemptions.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    ClientModule,
    ProductModule,
    PlanModule,
    ContributionModule,
    RedemptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
