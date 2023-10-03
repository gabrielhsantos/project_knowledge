import { PlanController } from '@app/controllers/plan.controller';
import { PlanDto } from '@core/domain/dtos/plan.dto';
import { Client } from '@core/infrastructure/entities/client.entity';
import { Plan } from '@core/infrastructure/entities/plan.entity';
import { Product } from '@core/infrastructure/entities/product.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from '@services/client.service';
import { PlanService } from '@services/plan.service';
import { ProductService } from '@services/product.service';
import { NotFoundException } from '@shared/exceptions/not-found.exception';
import { UnprocessableEntityException } from '@shared/exceptions/unprocessable-entity.exception';

const planEntity: Partial<Plan> = {
  uuid: '5e480b27-7083-4c4f-a460-4f2cf4a27e3a',
};

const clientEntity: Partial<Client> = {
  uuid: '18dfeb91-459a-4bc7-9cdd-d93b41f7bf62',
};

const productEntity: Partial<Product> = {
  uuid: '30f6b23f-c93d-4cf9-8916-bcdb9fac83df',
};

const body: PlanDto = {
  clientId: '18dfeb91-459a-4bc7-9cdd-d93b41f7bf62',
  productId: '30f6b23f-c93d-4cf9-8916-bcdb9fac83df',
  contribution: 2000.0,
  subscriptionDate: new Date('2022-04-05T12:00:00.000Z'),
  retirementAge: 60,
};

describe('PlanController', () => {
  let planController: PlanController;
  let planService: PlanService;
  let clientService: ClientService;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanController],
      providers: [
        {
          provide: PlanService,
          useValue: {
            create: jest.fn().mockResolvedValue(planEntity),
          },
        },
        {
          provide: ClientService,
          useValue: {
            findOneClientByUuid: jest.fn().mockResolvedValue(clientEntity),
          },
        },
        {
          provide: ProductService,
          useValue: {
            findOneProductByUuid: jest.fn().mockResolvedValue(productEntity),
          },
        },
      ],
    }).compile();

    planController = module.get<PlanController>(PlanController);
    planService = module.get<PlanService>(PlanService);
    clientService = module.get<ClientService>(ClientService);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(planController).toBeDefined();
    expect(planService).toBeDefined();
    expect(clientService).toBeDefined();
    expect(productService).toBeDefined();
  });

  describe('store', () => {
    it('should create a plan successfully', async () => {
      const result = await planController.create(body);

      expect(planService.create).toHaveBeenCalledWith(body);
      expect(planService.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ id: planEntity.uuid });
    });

    it('should not create a plan without a client', async () => {
      const errorMessage = 'Client not found.';

      const exceptionBody = {
        ...body,
        idCliente: '6f3f167d-d9e5-4cf7-a6e5-33410da4c77e',
      };

      jest.spyOn(clientService, 'findOneClientByUuid').mockResolvedValue(null);

      jest
        .spyOn(planService, 'create')
        .mockRejectedValue(new NotFoundException(errorMessage));

      expect(planController.create(exceptionBody)).rejects.toThrowError(
        errorMessage,
      );
      expect(planService.create).toHaveBeenCalledWith(exceptionBody);
    });

    it('should not create a plan without a product', async () => {
      const errorMessage = 'Product not found.';

      const exceptionBody = {
        ...body,
        idProduto: '6f3f167d-d9e5-4cf7-a6e5-33410da4c77e',
      };

      jest
        .spyOn(productService, 'findOneProductByUuid')
        .mockResolvedValue(null);

      jest
        .spyOn(planService, 'create')
        .mockRejectedValue(new NotFoundException(errorMessage));

      expect(planController.create(exceptionBody)).rejects.toThrowError(
        errorMessage,
      );
      expect(planService.create).toHaveBeenCalledWith(exceptionBody);
    });

    it('should not create a plan with invalid date of birth', async () => {
      const errorMessage = 'Invalid age to purchase the plan.';

      jest.spyOn(clientService, 'findOneClientByUuid').mockResolvedValue({
        ...clientEntity,
        dob: new Date('2015-08-24T12:00:00.000Z'),
      } as Client);

      jest
        .spyOn(planService, 'create')
        .mockRejectedValue(new UnprocessableEntityException(errorMessage));

      expect(planController.create(body)).rejects.toThrowError(errorMessage);
      expect(planService.create).toHaveBeenCalledWith(body);
    });

    it('should not create a plan with a expired date', async () => {
      const errorMessage = 'Expired date for saleExpiration field.';

      jest.spyOn(productService, 'findOneProductByUuid').mockResolvedValue({
        ...productEntity,
        saleExpiration: new Date('2000-01-01T12:00:00.000Z'),
      } as Product);

      jest
        .spyOn(planService, 'create')
        .mockRejectedValue(new UnprocessableEntityException(errorMessage));

      expect(planController.create(body)).rejects.toThrowError(errorMessage);
      expect(planService.create).toHaveBeenCalledWith(body);
    });

    it('should not create a plan with a invalid contribution value', async () => {
      const errorMessage = `Contribution does not meet the minimum value of R$3000.`;

      jest.spyOn(productService, 'findOneProductByUuid').mockResolvedValue({
        ...productEntity,
        minimumInitialContributionValue: 3000,
      } as Product);

      jest
        .spyOn(planService, 'create')
        .mockRejectedValue(new UnprocessableEntityException(errorMessage));

      expect(planController.create(body)).rejects.toThrowError(errorMessage);
      expect(planService.create).toHaveBeenCalledWith(body);
    });
  });
});
