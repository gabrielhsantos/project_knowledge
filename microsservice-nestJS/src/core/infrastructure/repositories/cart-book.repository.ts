import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ICartBookRepository } from '@core/domain/interfaces/cart-book.interface';
import { CartBook } from '../entities/cart-book.entity';

@Injectable()
export class CartBookRepository implements ICartBookRepository {
  constructor(
    @InjectModel(CartBook)
    private readonly cartBookModel: typeof CartBook,
  ) {}

  async bulkCreate(cartBookList: CartBook[]): Promise<void> {
    const newCartBookDataValues = cartBookList.map(
      (cartBook: CartBook) => cartBook.dataValues,
    );

    await this.cartBookModel.bulkCreate(newCartBookDataValues);
  }
}
