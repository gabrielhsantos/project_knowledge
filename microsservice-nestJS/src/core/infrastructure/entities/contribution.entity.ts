import {
  Model,
  Column,
  Table,
  PrimaryKey,
  DataType,
  AutoIncrement,
  ForeignKey,
} from 'sequelize-typescript';
import { Client } from './client.entity';
import { Plan } from './plan.entity';

@Table({
  tableName: 'contributions',
  timestamps: true,
})
export class Contribution extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  uuid: string;

  @ForeignKey(() => Client)
  @Column
  clientId: number;

  @ForeignKey(() => Plan)
  @Column
  planId: number;

  @Column({
    type: DataType.FLOAT,
  })
  contribution: number;
}
