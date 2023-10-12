import { Book } from '@core/infrastructure/entities/books.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CartBodyDto {
  @ApiProperty({ example: ['18dfeb91-459a-4bc7-9cdd-d93b41f7bf62'] })
  books: {
    id: string;
    qty?: number;
  }[];
}

export class CartDto {
  id?: number;
  uuid: string;
  userId?: number;
  paidAt?: Date;
  totalValue?: number;
  active: boolean;
  books?: Book[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class CartResponseDto {
  id: string;
}
