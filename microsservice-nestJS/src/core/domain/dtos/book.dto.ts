import { ApiProperty } from '@nestjs/swagger';

export class BookBodyDto {
  @ApiProperty({ example: 'The Lord of the Rings' })
  name: string;
  @ApiProperty({ example: 50.0 })
  value: number;
  @ApiProperty({ example: 1 })
  stock: number;
}

export class BookDto {
  id?: number;
  uuid: string;
  name: string;
  value: number;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class BookResponseDto {
  id: string;
  name: string;
  value: number;
  stock: number;
}
