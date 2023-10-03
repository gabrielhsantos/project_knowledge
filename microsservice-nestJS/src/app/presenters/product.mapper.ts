import {
  ProductBodyDto,
  ProductDto,
  ProductResponseDto,
} from '@core/domain/dtos/product.dto';

export const productRequestToDto = (
  productBody: ProductBodyDto,
): ProductDto => {
  return {
    name: productBody.nome,
    susep: productBody.susep,
    saleExpiration: productBody.expiracaoDeVenda,
    minimumInitialContributionValue: productBody.valorMinimoAporteInicial,
    minimumValueExtraContribution: productBody.valorMinimoAporteExtra,
    entryAge: productBody.idadeDeEntrada,
    exitAge: productBody.idadeDeSaida,
    initialRescueGracePeriod: productBody.carenciaInicialDeResgate,
    rescueBetweenGracePeriods: productBody.carenciaEntreResgates,
  };
};

export const productResponse = (productDB: ProductDto): ProductResponseDto => {
  return {
    id: productDB.uuid!,
  };
};
