import { ApiProperty } from '@nestjs/swagger';

export class ContributionDto {
  id?: number;
  uuid?: string;

  @ApiProperty({ example: '77a819c5-bb2f-4ade-84a2-a81dfc67428b' })
  clientId?: number | string;

  @ApiProperty({ example: '24fb6c42-6234-402e-ac84-2306d8c16137' })
  planId?: number | string;

  @ApiProperty({ example: 100.0 })
  contribution: number;
}

export class ContributionResponseDto {
  id: string;
}
