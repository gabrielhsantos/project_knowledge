import { BookResponseDto } from '@core/domain/dtos/book.dto';
import { Book } from '@core/infrastructure/entities/books.entity';

export const bookResponse = (book: Book): BookResponseDto => {
  return {
    id: book.uuid!,
    name: book.name,
    value: book.value,
    stock: book.stock,
  };
};

export const bookListResponse = (bookList: Book[]): BookResponseDto[] => {
  return bookList.map((book) => bookResponse(book));
};
