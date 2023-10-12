import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from '@core/infrastructure/entities/cart.entity';
import { CartBook } from '@core/infrastructure/entities/cart-book.entity';
import { Book } from '@core/infrastructure/entities/books.entity';
import { BookRepository } from '@core/infrastructure/repositories/book.repository';
import { CreateBookService } from '@services/book/create-book.service';
import { BookFactory } from '@core/domain/factories/book.factory';
import { CreateBookController } from '@app/controllers/book/create-book.controller';
import { FindBooksListController } from '@app/controllers/book/find-books-list.controller';
import { FindBooksListBookService } from '@services/book/find-books-list.service';

@Module({
  imports: [SequelizeModule.forFeature([Cart, CartBook, Book])],
  providers: [
    BookFactory,
    BookRepository,
    CreateBookService,
    FindBooksListBookService,
  ],
  controllers: [CreateBookController, FindBooksListController],
})
export class BookModule {}
