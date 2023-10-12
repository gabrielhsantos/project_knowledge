import 'reflect-metadata';
import { Injectable } from '@nestjs/common';
import { UserResponseDto } from '@core/domain/dtos/user.dto';
import { CreateUserService } from '@services/user/create-user.service';
import { BookResponseDto } from '@core/domain/dtos/book.dto';
import { CreateBookService } from '@services/book/create-book.service';

@Injectable()
export class TestSetupService {
  constructor(
    private readonly createBookService: CreateBookService,
    private readonly createUserService: CreateUserService,
  ) {}

  async setupUser(): Promise<UserResponseDto> {
    const user = await this.createUserService.create({
      name: 'Thomas',
      document: '45645645600',
    });

    return {
      id: user.uuid,
    };
  }

  async setupBook(): Promise<BookResponseDto> {
    const book = await this.createBookService.create({
      name: 'The Lord of The Rings',
      value: 49.99,
      stock: 1,
    });

    return {
      id: book.uuid,
      name: book.name,
      value: book.value,
      stock: book.stock,
    };
  }
}
