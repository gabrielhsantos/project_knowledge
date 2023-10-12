import { CreateBookController } from '@app/controllers/book/create-book.controller';
import { CreateUserController } from '@app/controllers/user/create-user.controller';
import { BookBodyDto } from '@core/domain/dtos/book.dto';
import { UserBodyDto } from '@core/domain/dtos/user.dto';
import { BookFactory } from '@core/domain/factories/book.factory';
import { UserFactory } from '@core/domain/factories/user.factory';
import { Book } from '@core/infrastructure/entities/books.entity';
import { User } from '@core/infrastructure/entities/user.entity';
import { BookRepository } from '@core/infrastructure/repositories/book.repository';
import { UserRepository } from '@core/infrastructure/repositories/user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateBookService } from '@services/book/create-book.service';
import { CreateUserService } from '@services/user/create-user.service';

const bookEntity: Partial<Book> = {
  uuid: 'd69258e9-eeee-41b6-8414-95e654c7a4bb',
};

const body: BookBodyDto = {
  name: 'The Lord of The Rings',
  value: 49.99,
  stock: 1,
};

describe('CreateBookController', () => {
  let createBookController: CreateBookController;
  let createBookService: CreateBookService;
  let bookRepository: BookRepository;
  let bookFactory: BookFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateBookController],
      providers: [
        {
          provide: CreateBookService,
          useValue: {
            create: jest.fn().mockResolvedValue(bookEntity),
          },
        },
        {
          provide: BookRepository,
          useValue: {
            create: jest.fn().mockResolvedValue(bookEntity),
            findOne: jest.fn().mockResolvedValue(bookEntity),
          },
        },
        {
          provide: UserFactory,
          useValue: {
            create: jest.fn().mockResolvedValue(bookEntity),
          },
        },
      ],
    }).compile();

    createBookController =
      module.get<CreateUserController>(CreateUserController);
    createBookService = module.get<CreateUserService>(CreateUserService);
    bookRepository = module.get<UserRepository>(UserRepository);
    bookFactory = module.get<UserFactory>(UserFactory);
  });

  it('should be defined', () => {
    expect(createBookController).toBeDefined();
    expect(createBookService).toBeDefined();
    expect(bookRepository).toBeDefined();
    expect(bookFactory).toBeDefined();
  });

  describe('store', () => {
    it('should create a user successfully', async () => {
      const result = await createBookController.handle(body);

      expect(createBookService.create).toHaveBeenCalledWith(body);
      expect(createBookService.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ id: bookEntity.uuid });
    });
  });
});
