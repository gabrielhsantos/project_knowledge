import { Module } from '@nestjs/common';
import { TestSetupService } from '../../../tests/setupTests';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '@core/infrastructure/entities/user.entity';
import { Book } from '@core/infrastructure/entities/books.entity';
import { Cart } from '@core/infrastructure/entities/cart.entity';
import { CartBook } from '@core/infrastructure/entities/cart-book.entity';
import { CreateBookService } from '@services/book/create-book.service';
import { CreateCartService } from '@services/cart/create-cart.service';
import { CreateUserService } from '@services/user/create-user.service';
import { LoginService } from '@services/auth/login.service';
import { UserRepository } from '@core/infrastructure/repositories/user.repository';
import { BookRepository } from '@core/infrastructure/repositories/book.repository';
import { CartRepository } from '@core/infrastructure/repositories/cart.repository';
import { CartBookRepository } from '@core/infrastructure/repositories/cart-book.repository';
import { BookFactory } from '@core/domain/factories/book.factory';
import { CartFactory } from '@core/domain/factories/cart.factory';
import { UserFactory } from '@core/domain/factories/user.factory';
import { CartBookFactory } from '@core/domain/factories/car-book.factory';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';

@Module({
  imports: [SequelizeModule.forFeature([User, Book, Cart, CartBook])],
  providers: [
    TestSetupService,

    CreateBookService,
    BookRepository,
    BookFactory,

    CreateCartService,
    CartRepository,
    CartFactory,

    CreateUserService,
    UserRepository,
    UserFactory,

    CartBookRepository,
    CartBookFactory,

    LoginService,
    JwtService,
  ],
})
export class TestModule {}
