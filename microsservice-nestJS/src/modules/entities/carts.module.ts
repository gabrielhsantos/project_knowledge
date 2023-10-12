import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from '@core/infrastructure/entities/cart.entity';
import { CartService } from '@services/cart/cart.service';
import { CartRepository } from '@core/infrastructure/repositories/cart.repository';
import { CartFactory } from '@core/domain/factories/cart.factory';
import { CartController } from '@app/controllers/cart/create-cart.controller';
import { CartBook } from '@core/infrastructure/entities/cart-book.entity';
import { Book } from '@core/infrastructure/entities/books.entity';
import { BookRepository } from '@core/infrastructure/repositories/book.repository';
import { User } from '@core/infrastructure/entities/user.entity';
import { UserRepository } from '@core/infrastructure/repositories/user.repository';
import { BookFactory } from '@core/domain/factories/book.factory';
import { CartBookFactory } from '@core/domain/factories/car-book.factory';
import { CartBookRepository } from '@core/infrastructure/repositories/cart-book.repository';

@Module({
  imports: [SequelizeModule.forFeature([Cart, CartBook, Book, User])],
  providers: [
    CartRepository,
    CartFactory,
    CartService,
    BookRepository,
    BookFactory,
    UserRepository,
    CartBookFactory,
    CartBookRepository,
  ],
  controllers: [CartController],
})
export class CartModule {}
