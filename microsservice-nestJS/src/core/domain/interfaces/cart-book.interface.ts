import { CartBook } from '@core/infrastructure/entities/cart-book.entity';

export interface ICartBookRepository {
  bulkCreate(data: CartBook[]): Promise<void>;
}
