import { BookDto } from '../dtos/book.dto';
import { Book } from '@core/infrastructure/entities/books.entity';

export class BookFactory {
  public async create(book: BookDto): Promise<Book> {
    return new Book(book);
  }
}
