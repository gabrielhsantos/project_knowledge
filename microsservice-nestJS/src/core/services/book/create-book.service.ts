import { ICreateService } from '@core/domain/interfaces/service.interface';
import { BookRepository } from '@core/infrastructure/repositories/book.repository';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { BookBodyDto } from '@core/domain/dtos/book.dto';
import { Book } from '@core/infrastructure/entities/books.entity';
import { BookFactory } from '@core/domain/factories/book.factory';
import { BadRequestException } from '@shared/exceptions';

@Injectable()
export class CreateBookService
  implements ICreateService<BookBodyDto, Promise<Book>>
{
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly bookFactory: BookFactory,
  ) {}

  async create({ name, value, stock }: BookBodyDto): Promise<Book> {
    if (stock && stock <= 0)
      throw new BadRequestException('Invalid value for stock.');

    const bookAlreadyExists = await this.bookRepository.findOne({ name });
    const setStock = stock ?? 1;

    if (bookAlreadyExists) {
      const bookDto = await this.bookFactory.create({
        id: bookAlreadyExists.id,
        uuid: bookAlreadyExists.uuid,
        name: bookAlreadyExists.name,
        value,
        stock: setStock + bookAlreadyExists.stock,
      });

      await this.bookRepository.update(bookDto);

      return bookDto;
    }

    const bookDto = await this.bookFactory.create({
      uuid: uuidv4(),
      name,
      value,
      stock: setStock,
    });

    return await this.bookRepository.create(bookDto);
  }
}
