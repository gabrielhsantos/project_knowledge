import {
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
} from 'sequelize-typescript';
import { Book } from './books.entity';
import { Cart } from './cart.entity';
import { CartBookDto } from '@core/domain/dtos/cart-book.dto';
import { Optional } from 'sequelize';

interface CartBookDtoOptionalAttributes extends Optional<CartBookDto, 'id'> {}

@Table({
  tableName: 'carts_books',
  timestamps: true,
})
export class CartBook extends Model<
  CartBookDto,
  CartBookDtoOptionalAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Cart)
  @Column
  cartId: number;

  @ForeignKey(() => Book)
  @Column
  bookId: number;

  @Column
  qty: number;
}
