import { CartResponseDto } from '@core/domain/dtos/cart.dto';
import { Cart } from '@core/infrastructure/entities/cart.entity';

export const cartResponse = (cart: Cart): CartResponseDto => {
  return {
    id: cart.uuid!,
  };
};
