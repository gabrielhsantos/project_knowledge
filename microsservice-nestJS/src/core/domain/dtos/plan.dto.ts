import { ApiProperty } from '@nestjs/swagger';

export class PlanBodyDto {
  @ApiProperty({ example: '18dfeb91-459a-4bc7-9cdd-d93b41f7bf62' })
  idCliente: string;

  @ApiProperty({ example: '30f6b23f-c93d-4cf9-8916-bcdb9fac83df' })
  idProduto: string;

  @ApiProperty({ example: 2000.0 })
  aporte: number;

  @ApiProperty({ example: '2022-04-05T12:00:00.000Z' })
  dataDaContratacao: Date;

  @ApiProperty({ example: 60 })
  idadeDeAposentadoria: number;
}

export class PlanDto {
  uuid?: string;
  clientId?: number;
  clientUuid?: string;
  productId?: number;
  productUuid?: string;
  contribution: number;
  subscriptionDate: Date;
  retirementAge: number;
}

export class PlanResponseDto {
  id: string;
}
