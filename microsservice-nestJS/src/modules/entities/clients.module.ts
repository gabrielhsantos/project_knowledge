import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Client } from '@core/infrastructure/entities/client.entity';
import { ClientService } from '@services/client.service';
import { ClientController } from '@app/controllers/client.controller';
import { ClientRepository } from '@core/infrastructure/repositories/client.repository';

@Module({
  imports: [SequelizeModule.forFeature([Client])],
  providers: [ClientService, ClientRepository],
  controllers: [ClientController],
})
export class ClientModule {}
