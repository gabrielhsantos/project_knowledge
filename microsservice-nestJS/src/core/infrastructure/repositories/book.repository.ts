import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from '../entities/books.entity';
import { IBookRepository } from '@core/domain/interfaces/book.interface';
import { Op } from 'sequelize';

@Injectable()
export class BookRepository implements IBookRepository {
  constructor(
    @InjectModel(Book)
    private readonly bookModel: typeof Book,
  ) {}

  async create({ dataValues }: Book): Promise<Book> {
    return await this.bookModel.create(dataValues);
  }

  async findAll(uuids?: string[]): Promise<Book[]> {
    const filters = uuids
      ? { where: { uuid: { [Op.in]: uuids } } }
      : {
          where: { stock: { [Op.gte]: 1 } },
        };

    return await this.bookModel.findAll(filters);
  }

  async findOne(filters: Partial<Book>): Promise<Book | null> {
    return await this.bookModel.findOne({ where: filters });
  }

  async update(data: Partial<Book>): Promise<void> {
    const { value, stock } = data.dataValues!;

    await this.bookModel.update({ value, stock }, { where: { id: data.id } });
  }
}
