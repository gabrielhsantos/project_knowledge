import {
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Book } from './books.entity';
import { CartBook } from './cart-book.entity';
import { Optional } from 'sequelize';
import { CartDto } from '@core/domain/dtos/cart.dto';
import { User } from './user.entity';

interface CartDtoOptionalAttributes extends Optional<CartDto, 'id'> {}

@Table({
  tableName: 'carts',
  timestamps: true,
})
export class Cart extends Model<CartDto, CartDtoOptionalAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @Column
  public uuid: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @Column({
    type: DataType.FLOAT,
  })
  public totalValue: number;

  @Column
  public paidAt: Date;

  @Column
  public active: boolean;

  @BelongsToMany(() => Book, () => CartBook)
  public books: Book[];
}
