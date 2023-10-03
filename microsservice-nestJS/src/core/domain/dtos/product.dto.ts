import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  id?: number;
  uuid?: string;

  @ApiProperty({ example: 'Brasilprev Longo Prazo' })
  name: string;

  @ApiProperty({ example: '15414900840201817' })
  susep: string;

  @ApiProperty({ example: '2021-01-01T12:00:00.000Z' })
  saleExpiration: Date;

  @ApiProperty({ example: 1000.0 })
  minimumInitialContributionValue: number;

  @ApiProperty({ example: 100.0 })
  minimumValueExtraContribution: number;

  @ApiProperty({ example: 18 })
  entryAge: number;

  @ApiProperty({ example: 60 })
  exitAge: number;

  @ApiProperty({ example: 60 })
  initialRescueGracePeriod: number;

  @ApiProperty({ example: 30 })
  rescueBetweenGracePeriods: number;
}

export class ProductResponseDto {
  id: string;
}
