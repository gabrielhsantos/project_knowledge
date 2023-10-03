import { ClientDto } from '@core/domain/dtos/client.dto';
import { Client } from '@core/infrastructure/entities/client.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConflictException } from '@shared/exceptions/conflict.exception';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client)
    private readonly clientModel: typeof Client,
  ) {}

  async create(client: ClientDto): Promise<Client> {
    const clientDb = await this.findOneClientByDocument(client.document);
    if (clientDb) throw new ConflictException('Client already registered.');

    const newClient = await this.clientModel.create({
      uuid: uuidv4(),
      ...client,
    });

    return newClient;
  }

  async findOneClientByUuid(uuid: string): Promise<Client | null> {
    return await this.clientModel.findOne({ where: { uuid } });
  }

  async findOneClientByDocument(document: string): Promise<Client | null> {
    return await this.clientModel.findOne({ where: { document } });
  }
}
