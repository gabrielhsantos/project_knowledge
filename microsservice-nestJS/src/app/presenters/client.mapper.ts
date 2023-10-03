import { ClientDto, ClientResponseDto } from '@core/domain/dtos/client.dto';

export const clientResponse = (clientDB: ClientDto): ClientResponseDto => {
  return {
    id: clientDB.uuid!,
  };
};
