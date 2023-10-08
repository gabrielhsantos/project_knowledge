import { Product } from '@core/infrastructure/entities/product.entity';
import { ProductDto } from '../dtos/product.dto';

export interface IProductRepository {
  findOneByUuid(uuid: string): Promise<Product | null>;
  findOneBySusep(susep: string): Promise<Product | null>;
  create(data: ProductDto): Promise<Product>;
}
