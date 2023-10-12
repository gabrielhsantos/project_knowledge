import { ProductController } from '@app/controllers/product.controller';
import { ProductDto } from '@core/domain/dtos/product.dto';
import { Product } from '@core/infrastructure/entities/product.entity';
import { ProductRepository } from '@core/infrastructure/repositories/product.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '@services/product.service';
import { ConflictException } from '@shared/exceptions/conflict.exception';
import { UnprocessableEntityException } from '@shared/exceptions/unprocessable-entity.exception';

const productEntity: Partial<Product> = {
  uuid: '5e480b27-7083-4c4f-a460-4f2cf4a27e3a',
};

const body: ProductDto = {
  name: 'Brasilprev Longo Prazo',
  susep: '15414900840201817',
  saleExpiration: new Date('2025-01-01T12:00:00.000Z'),
  minimumInitialContributionValue: 1000.0,
  minimumValueExtraContribution: 100.0,
  entryAge: 18,
  exitAge: 60,
  initialRescueGracePeriod: 60,
  rescueBetweenGracePeriods: 30,
};

describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService;
  let productRepository: ProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            create: jest.fn().mockResolvedValue(productEntity),
          },
        },
        {
          provide: ProductRepository,
          useValue: {
            create: jest.fn().mockResolvedValue(productEntity),
            findOneBySusep: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    productController = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
    productRepository = module.get<ProductRepository>(ProductRepository);
  });

  it('should be defined', () => {
    expect(productController).toBeDefined();
    expect(productService).toBeDefined();
    expect(productRepository).toBeDefined();
  });

  describe('store', () => {
    it('should create a product successfully', async () => {
      const result = await productController.handle(body);

      expect(productService.create).toHaveBeenCalledWith(body);
      expect(productService.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ id: productEntity.uuid });
    });

    it('should not create a product with a expirated date', async () => {
      const errorMessage = 'Wrong date to saleExpiration field.';
      const exceptionBody = {
        ...body,
        expiracaoDeVenda: new Date('2000-01-01T12:00:00.000Z'),
      };

      jest
        .spyOn(productService, 'create')
        .mockRejectedValue(new UnprocessableEntityException(errorMessage));

      expect(productController.handle(exceptionBody)).rejects.toThrowError(
        errorMessage,
      );
      expect(productService.create).toHaveBeenCalledWith(exceptionBody);
      expect(productService.create).toHaveBeenCalledTimes(1);
    });

    it('should not create a product with same susep', async () => {
      const errorMessage = 'Product already registered.';

      jest
        .spyOn(productRepository, 'findOneBySusep')
        .mockResolvedValue(productEntity as Product);

      jest
        .spyOn(productService, 'create')
        .mockRejectedValue(new ConflictException(errorMessage));

      expect(productController.handle(body)).rejects.toThrowError(errorMessage);
      expect(productService.create).toHaveBeenCalledWith(body);
      expect(productService.create).toHaveBeenCalledTimes(1);
    });
  });
});
