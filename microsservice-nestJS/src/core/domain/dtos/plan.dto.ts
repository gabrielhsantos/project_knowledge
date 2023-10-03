import { ApiProperty } from '@nestjs/swagger';

export class PlanDto {
  id?: number;
  uuid?: string;

  @ApiProperty({ example: '18dfeb91-459a-4bc7-9cdd-d93b41f7bf62' })
  clientId?: number | string;

  @ApiProperty({ example: '30f6b23f-c93d-4cf9-8916-bcdb9fac83df' })
  productId?: number | string;

  @ApiProperty({ example: 2000.0 })
  contribution: number;

  @ApiProperty({ example: '2022-04-05T12:00:00.000Z' })
  subscriptionDate: Date;

  @ApiProperty({ example: 60 })
  retirementAge: number;
}

export class PlanResponseDto {
  id: string;
}
