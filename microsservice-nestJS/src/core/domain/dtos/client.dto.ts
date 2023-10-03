import { ApiProperty } from '@nestjs/swagger';

export class ClientBodyDto {
  @ApiProperty({ example: '45645645600' })
  cpf: string;

  @ApiProperty({ example: 'José da Silva' })
  nome: string;

  @ApiProperty({ example: 'jose@cliente.com' })
  email: string;

  @ApiProperty({ example: '2010-08-24T12:00:00.000Z' })
  dataDeNascimento: Date;

  @ApiProperty({ example: 'Masculino' })
  genero: string;

  @ApiProperty({ example: 2899.5 })
  rendaMensal: number;
}

export class ClientDto {
  uuid?: string;
  document: string;
  name: string;
  email: string;
  dob: Date;
  gender: string;
  income: number;
}

export class ClientResponseDto {
  id: string;
}
