import { ApiProperty } from '@nestjs/swagger';

export class ClientDto {
  id?: number;
  uuid?: string;

  @ApiProperty({ example: '45645645600' })
  document: string;

  @ApiProperty({ example: 'José da Silva' })
  name: string;

  @ApiProperty({ example: 'jose@cliente.com' })
  email: string;

  @ApiProperty({ example: '2010-08-24T12:00:00.000Z' })
  dob: Date;

  @ApiProperty({ example: 'Masculino' })
  gender: string;

  @ApiProperty({ example: 2899.5 })
  income: number;
}

export class ClientResponseDto {
  id: string;
}
