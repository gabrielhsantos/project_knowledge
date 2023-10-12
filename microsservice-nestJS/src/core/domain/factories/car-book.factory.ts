import { CartBook } from '@core/infrastructure/entities/cart-book.entity';
import { CartBookDto } from '../dtos/cart-book.dto';

export class CartBookFactory {
  public async create(cartBook: CartBookDto): Promise<CartBook> {
    return new CartBook(cartBook);
  }
}
