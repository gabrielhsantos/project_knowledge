import { Book } from '@core/infrastructure/entities/books.entity';

export interface IBookRepository {
  create(data: Book): Promise<Book>;
  findAll(uuids?: string[]): Promise<Book[]>;
  findOne(filters: Partial<Book>): Promise<Book | null>;
  update(data: Partial<Book>): Promise<void>;
}
