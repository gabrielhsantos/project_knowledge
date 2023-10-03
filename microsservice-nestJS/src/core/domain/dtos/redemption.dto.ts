import { ApiProperty } from '@nestjs/swagger';

export class RedemptionDto {
  id?: number;
  uuid?: string;

  @ApiProperty({ example: '98add7e5-1475-4af0-8478-8a94965e7000' })
  planId?: number | string;

  @ApiProperty({ example: 1000.0 })
  redemptionValue: number;
}

export class RedemptionResponseDto {
  id: string;
}
