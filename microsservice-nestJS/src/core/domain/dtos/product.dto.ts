import { ApiProperty } from '@nestjs/swagger';

export class ProductBodyDto {
  @ApiProperty({ example: 'Brasilprev Longo Prazo' }) nome: string;
  @ApiProperty({ example: '15414900840201817' }) susep: string;
  @ApiProperty({ example: '2021-01-01T12:00:00.000Z' }) expiracaoDeVenda: Date;
  @ApiProperty({ example: 1000.0 }) valorMinimoAporteInicial: number;
  @ApiProperty({ example: 100.0 }) valorMinimoAporteExtra: number;
  @ApiProperty({ example: 18 }) idadeDeEntrada: number;
  @ApiProperty({ example: 60 }) idadeDeSaida: number;
  @ApiProperty({ example: 60 }) carenciaInicialDeResgate: number;
  @ApiProperty({ example: 30 }) carenciaEntreResgates: number;
}

export class ProductDto {
  uuid?: string;
  name: string;
  susep: string;
  saleExpiration: Date;
  minimumInitialContributionValue: number;
  minimumValueExtraContribution: number;
  entryAge: number;
  exitAge: number;
  initialRescueGracePeriod: number;
  rescueBetweenGracePeriods: number;
}

export class ProductResponseDto {
  id: string;
}
