import { Cart } from '@core/infrastructure/entities/cart.entity';
import { CartDto } from '../dtos/cart.dto';

export interface ICartRepository {
  create(data: Cart): Promise<Cart>;
  findOneByUuid(uuid: string): Promise<Cart | null>;
  update({ paidAt, active, uuid }: CartDto): Promise<void>;
}
