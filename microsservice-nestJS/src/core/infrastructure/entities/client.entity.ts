import {
  Model,
  Column,
  Table,
  PrimaryKey,
  DataType,
  AutoIncrement,
  HasMany,
} from 'sequelize-typescript';
import { Plan } from './plan.entity';
import { Contribution } from './contribution.entity';

@Table({
  tableName: 'clients',
  timestamps: true,
})
export class Client extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  uuid: string;

  @Column
  document: string;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  dob: Date;

  @Column
  gender: string;

  @Column({
    type: DataType.FLOAT,
  })
  income: number;

  @HasMany(() => Plan)
  plans: Plan[];

  @HasMany(() => Contribution)
  contributions: Contribution[];
}
