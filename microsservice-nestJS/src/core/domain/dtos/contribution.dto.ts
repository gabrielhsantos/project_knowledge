import { ApiProperty } from '@nestjs/swagger';

export class ContributionBodyDto {
  @ApiProperty({ example: '77a819c5-bb2f-4ade-84a2-a81dfc67428b' })
  idCliente: string;

  @ApiProperty({ example: '24fb6c42-6234-402e-ac84-2306d8c16137' })
  idPlano: string;

  @ApiProperty({ example: 100.0 })
  valorAporte: number;
}

export class ContributionDto {
  uuid?: string;
  clientId?: number;
  clientUuid?: string;
  planId?: number;
  planUuid?: string;
  contribution: number;
}

export class ContributionResponseDto {
  id: string;
}
