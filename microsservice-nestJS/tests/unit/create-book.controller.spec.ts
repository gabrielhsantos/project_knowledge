import { CreateBookController } from '@app/controllers/book/create-book.controller';
import { BookBodyDto } from '@core/domain/dtos/book.dto';
import { BookFactory } from '@core/domain/factories/book.factory';
import { Book } from '@core/infrastructure/entities/books.entity';
import { BookRepository } from '@core/infrastructure/repositories/book.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateBookService } from '@services/book/create-book.service';

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
          provide: BookFactory,
          useValue: {
            create: jest.fn().mockResolvedValue(bookEntity),
          },
        },
      ],
    }).compile();

    createBookController =
      module.get<CreateBookController>(CreateBookController);
    createBookService = module.get<CreateBookService>(CreateBookService);
    bookRepository = module.get<BookRepository>(BookRepository);
    bookFactory = module.get<BookFactory>(BookFactory);
  });

  it('should be defined', () => {
    expect(createBookController).toBeDefined();
    expect(createBookService).toBeDefined();
    expect(bookRepository).toBeDefined();
    expect(bookFactory).toBeDefined();
  });

  describe('store', () => {
    it('should create a book successfully', async () => {
      const result = await createBookController.handle(body);

      expect(createBookService.create).toHaveBeenCalledWith(body);
      expect(createBookService.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ id: bookEntity.uuid });
    });
  });
});
