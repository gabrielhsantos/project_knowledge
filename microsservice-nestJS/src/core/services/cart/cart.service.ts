import { CartBodyDto } from '@core/domain/dtos/cart.dto';
import { CartFactory } from '@core/domain/factories/cart.factory';
import { ICreateService } from '@core/domain/interfaces/service.interface';
import { Cart } from '@core/infrastructure/entities/cart.entity';
import { CartRepository } from '@core/infrastructure/repositories/cart.repository';
import { BookRepository } from '@core/infrastructure/repositories/book.repository';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UnprocessableEntityException } from '@shared/exceptions/unprocessable-entity.exception';
import { UserRepository } from '@core/infrastructure/repositories/user.repository';
import { NotFoundException } from '@shared/exceptions/not-found.exception';
import { BookFactory } from '@core/domain/factories/book.factory';
import { CartBookFactory } from '@core/domain/factories/car-book.factory';
import { CartBookRepository } from '@core/infrastructure/repositories/cart-book.repository';
import { Book } from '@core/infrastructure/entities/books.entity';
import { CartBookDto } from '@core/domain/dtos/cart-book.dto';

@Injectable()
export class CartService implements ICreateService<CartBodyDto, Promise<Cart>> {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly bookRepository: BookRepository,
    private readonly userRepository: UserRepository,
    private readonly cartBookRepository: CartBookRepository,
    private readonly cartFactory: CartFactory,
    private readonly bookFactory: BookFactory,
    private readonly cartBookFactory: CartBookFactory,
  ) {}

  async create(cart: CartBodyDto, userId: string): Promise<Cart> {
    if (!userId)
      throw new UnprocessableEntityException('Field userId cannot be null.');

    const user = await this.userRepository.findOne({ uuid: userId });
    if (!user) throw new NotFoundException('User not found.');

    if (!cart.books || !cart.books.length)
      throw new UnprocessableEntityException('The cart is empty.');

    const booksIds = cart.books.map((book) => book.id);

    const books = await this.bookRepository.findAll(booksIds);
    if (!books.length)
      throw new UnprocessableEntityException('Invalid books ids in cart.');

    const { totalValue, cartBookList } = await this.updateStock(cart, books);

    const cartDto = await this.cartFactory.create({
      uuid: uuidv4(),
      userId: user.id,
      totalValue,
      active: true,
    });

    const newCart = await this.cartRepository.create(cartDto);

    await this.createCartBookAssociations(cartBookList, newCart.id);

    return newCart;
  }

  async updateStock(
    cart: CartBodyDto,
    books: Book[],
  ): Promise<{ totalValue: number; cartBookList: Partial<CartBookDto>[] }> {
    let totalValue = 0;
    const cartBookList = [];

    for await (const book of books) {
      totalValue = totalValue + book.value;
      const subtractBookInStock = cart.books.find(
        (cartBook) => cartBook.id === book.uuid,
      );

      const updatedStock = book.stock - (subtractBookInStock?.qty ?? 1);
      if (updatedStock < 0)
        throw new UnprocessableEntityException('Invalid quantity in stock.');

      const bookDto = await this.bookFactory.create({
        id: book.id,
        uuid: book.uuid,
        name: book.name,
        value: book.value,
        stock: book.stock - (subtractBookInStock?.qty ?? 1),
      });

      await this.bookRepository.update(bookDto);

      cartBookList.push({
        bookId: book.id,
        qty: subtractBookInStock?.qty ?? 1,
      });
    }

    return { totalValue, cartBookList };
  }

  async createCartBookAssociations(
    cartBookList: Partial<CartBookDto>[],
    cartId: number,
  ): Promise<void> {
    const cartBookDto = await Promise.all(
      cartBookList.map(async (carBook) => {
        const cartBookInstance = await this.cartBookFactory.create({
          cartId: cartId,
          bookId: carBook.bookId!,
          qty: carBook.qty!,
        });
        return cartBookInstance;
      }),
    );

    await this.cartBookRepository.bulkCreate(cartBookDto);
  }
}
