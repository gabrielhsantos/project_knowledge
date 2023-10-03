import { ApiProperty } from '@nestjs/swagger';

export class RedemptionBodyDto {
  @ApiProperty({ example: '98add7e5-1475-4af0-8478-8a94965e7000' })
  idPlano: string;

  @ApiProperty({ example: 1000.0 })
  valorResgate: number;
}

export class RedemptionDto {
  uuid?: string;
  planId?: number;
  planUuid?: string;
  redemptionValue: number;
}

export class RedemptionResponseDto {
  id: string;
}
