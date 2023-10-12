import { ApiProperty } from '@nestjs/swagger';

export class UserBodyDto {
  @ApiProperty({ example: 'Thomas' })
  name: string;
  @ApiProperty({
    example: '62816284605',
    description:
      'Obs: como este é um repositório de exemplo, a senha do usuário será seu CPF.',
  })
  document: string;
}

export class UserDto {
  id?: number;
  uuid: string;
  name: string;
  document: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserResponseDto {
  id: string;
}
