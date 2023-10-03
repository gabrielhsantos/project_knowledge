import {
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
  DataType,
  ForeignKey,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { Client } from './client.entity';
import { Product } from './product.entity';
import { Contribution } from './contribution.entity';
import { Redemption } from './redemption.entity';

@Table({
  tableName: 'plans',
  timestamps: true,
})
export class Plan extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  uuid: string;

  @ForeignKey(() => Client)
  @Column
  clientId: number;

  @ForeignKey(() => Product)
  @Column
  productId: number;

  @Column({
    type: DataType.FLOAT,
  })
  contribution: number;

  @Column
  subscriptionDate: Date;

  @Column
  retirementAge: number;

  @BelongsTo(() => Client)
  client: Client;

  @BelongsTo(() => Product)
  product: Product;

  @HasMany(() => Contribution)
  contributions: Contribution[];

  @HasMany(() => Redemption)
  redemptions: Redemption[];
}
