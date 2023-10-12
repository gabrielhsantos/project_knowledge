import { BookDto } from '@core/domain/dtos/book.dto';
import { Optional } from 'sequelize';
import {
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
  DataType,
} from 'sequelize-typescript';

interface BookDtoOptionalAttributes extends Optional<BookDto, 'id'> {}

@Table({
  tableName: 'books',
  timestamps: true,
})
export class Book extends Model<BookDto, BookDtoOptionalAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  uuid: string;

  @Column
  name: string;

  @Column({
    type: DataType.FLOAT,
  })
  value: number;

  @Column
  stock: number;
}
