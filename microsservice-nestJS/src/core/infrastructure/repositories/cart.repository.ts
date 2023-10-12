import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from '../entities/cart.entity';
import { CartDto } from '@core/domain/dtos/cart.dto';
import { ICartRepository } from '@core/domain/interfaces/cart.interface';
import { Book } from '../entities/books.entity';

@Injectable()
export class CartRepository implements ICartRepository {
  constructor(
    @InjectModel(Cart)
    private readonly cartModel: typeof Cart,
  ) {}

  async findOneByUuid(uuid: string): Promise<Cart | null> {
    return await this.cartModel.findOne({
      include: { model: Book },
      where: { uuid },
    });
  }

  async create({ dataValues }: Cart): Promise<Cart> {
    return await this.cartModel.create(dataValues);
  }

  async update({ paidAt, active, uuid }: CartDto): Promise<void> {
    await this.cartModel.update(
      { paidAt, active },
      {
        where: { uuid, active: true },
      },
    );
  }
}
