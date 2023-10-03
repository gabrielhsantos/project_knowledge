import { ProductDto, ProductResponseDto } from '@core/domain/dtos/product.dto';

export const productResponse = (productDB: ProductDto): ProductResponseDto => {
  return {
    id: productDB.uuid!,
  };
};
