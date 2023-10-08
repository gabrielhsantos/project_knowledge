import { Client } from '@core/infrastructure/entities/client.entity';
import { ClientDto } from '../dtos/client.dto';

export interface IClientRepository {
  findOneByUuid(uuid: string): Promise<Client | null>;
  findOneByDocument(document: string): Promise<Client | null>;
  create(data: ClientDto): Promise<Client>;
}
