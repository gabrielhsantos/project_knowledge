import {
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { Plan } from './plan.entity';

@Table({
  tableName: 'products',
  timestamps: true,
})
export class Product extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  uuid: string;

  @Column
  name: string;

  @Column
  susep: string;

  @Column
  saleExpiration: Date;

  @Column({
    type: DataType.FLOAT,
  })
  minimumInitialContributionValue: number;

  @Column({
    type: DataType.FLOAT,
  })
  minimumValueExtraContribution: number;

  @Column
  entryAge: number;

  @Column
  exitAge: number;

  @Column
  initialRescueGracePeriod: number;

  @Column
  rescueBetweenGracePeriods: number;

  @HasMany(() => Plan)
  plans: Plan[];
}
