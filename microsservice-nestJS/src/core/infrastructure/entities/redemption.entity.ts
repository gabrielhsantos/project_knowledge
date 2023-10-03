import {
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Plan } from './plan.entity';

@Table({
  tableName: 'redemptions',
  timestamps: true,
})
export class Redemption extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  uuid: string;

  @ForeignKey(() => Plan)
  @Column
  planId: number;

  @Column({
    type: DataType.FLOAT,
  })
  redemptionValue: number;

  @BelongsTo(() => Plan)
  plan: Plan;
}
