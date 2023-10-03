import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Client } from '@core/infrastructure/entities/client.entity';
import { ClientService } from '@services/client.service';
import { ClientController } from '@app/controllers/client.controller';

@Module({
  imports: [SequelizeModule.forFeature([Client])],
  providers: [ClientService],
  controllers: [ClientController],
})
export class ClientModule {}
