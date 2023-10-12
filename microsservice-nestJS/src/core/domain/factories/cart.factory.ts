import { Cart } from '@core/infrastructure/entities/cart.entity';
import { CartDto } from '../dtos/cart.dto';

export class CartFactory {
  public async create(cart: CartDto): Promise<Cart> {
    return new Cart(cart);
  }
}
