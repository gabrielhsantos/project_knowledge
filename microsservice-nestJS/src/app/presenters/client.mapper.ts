import { ClientBodyDto, ClientDto } from '@core/domain/dtos/client.dto';

export const clientRequestToDto = (clientBody: ClientBodyDto): ClientDto => {
  return {
    document: clientBody.cpf,
    name: clientBody.nome,
    email: clientBody.email,
    dob: clientBody.dataDeNascimento,
    gender: clientBody.genero,
    income: clientBody.rendaMensal,
  };
};

export const clientResponse = (clientDB: ClientDto): { id: string } => {
  return {
    id: clientDB.uuid!,
  };
};
