import { ClientDto } from '@core/domain/dtos/client.dto';
import { ICreateService } from '@core/domain/interfaces/service.interface';
import { Client } from '@core/infrastructure/entities/client.entity';
import { ClientRepository } from '@core/infrastructure/repositories/client.repository';
import { Injectable } from '@nestjs/common';
import { ConflictException } from '@shared/exceptions/conflict.exception';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ClientService
  implements ICreateService<ClientDto, Promise<Client>>
{
  constructor(private readonly clientRepository: ClientRepository) {}

  async create(client: ClientDto): Promise<Client> {
    const clientDb = await this.clientRepository.findOneByDocument(
      client.document,
    );
    if (clientDb) throw new ConflictException('Client already registered.');

    const newClient = await this.clientRepository.create({
      uuid: uuidv4(),
      ...client,
    });

    return newClient;
  }
}
