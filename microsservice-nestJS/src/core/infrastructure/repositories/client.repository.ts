import { IClientRepository } from '@core/domain/interfaces/client.interface';
import { Client } from '@core/infrastructure/entities/client.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ClientRepository implements IClientRepository {
  constructor(
    @InjectModel(Client)
    private readonly clientModel: typeof Client,
  ) {}

  async findOneByUuid(uuid: string): Promise<Client | null> {
    return await this.clientModel.findOne({ where: { uuid } });
  }

  async findOneByDocument(document: string): Promise<Client | null> {
    return await this.clientModel.findOne({ where: { document } });
  }

  async create(clientData: any): Promise<Client> {
    return await this.clientModel.create(clientData);
  }
}
