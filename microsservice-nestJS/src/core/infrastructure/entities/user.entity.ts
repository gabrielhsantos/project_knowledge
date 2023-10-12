import {
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
  HasMany,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { UserDto } from '@core/domain/dtos/user.dto';
import { Cart } from './cart.entity';

interface UserDtoOptionalAttributes extends Optional<UserDto, 'id'> {}

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<UserDto, UserDtoOptionalAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @Column
  public uuid: string;

  @Column
  public name: string;

  @Column
  public document: string;

  @Column
  public password: string;

  @HasMany(() => Cart)
  public carts: Cart[];
}
