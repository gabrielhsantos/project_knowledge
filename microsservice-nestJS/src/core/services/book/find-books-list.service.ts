import { IFindAllService } from '@core/domain/interfaces/service.interface';
import { BookRepository } from '@core/infrastructure/repositories/book.repository';
import { Injectable } from '@nestjs/common';
import { Book } from '@core/infrastructure/entities/books.entity';

@Injectable()
export class FindBooksListService
  implements IFindAllService<Book, Promise<Book[]>>
{
  constructor(private readonly bookRepository: BookRepository) {}

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.findAll();
  }
}
