import { ContributionController } from '@app/controllers/contribution.controller';
import { ContributionDto } from '@core/domain/dtos/contribution.dto';
import { Client } from '@core/infrastructure/entities/client.entity';
import { Contribution } from '@core/infrastructure/entities/contribution.entity';
import { Plan } from '@core/infrastructure/entities/plan.entity';
import { Product } from '@core/infrastructure/entities/product.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from '@services/client.service';
import { ContributionService } from '@services/contribution.service';
import { PlanService } from '@services/plan.service';
import { NotFoundException } from '@shared/exceptions/not-found.exception';
import { UnprocessableEntityException } from '@shared/exceptions/unprocessable-entity.exception';

const contributionEntity: Partial<Contribution> = {
  uuid: 'ad1c4905-7f1f-4ed6-bb33-ed0cb553f934',
};

const planEntity: Partial<Plan> = {
  uuid: '5e480b27-7083-4c4f-a460-4f2cf4a27e3a',
};

const clientEntity: Partial<Client> = {
  uuid: '18dfeb91-459a-4bc7-9cdd-d93b41f7bf62',
};

const productEntity: Partial<Product> = {
  uuid: '04aac243-be46-4a72-830f-3f3d72f6082e',
  minimumValueExtraContribution: 100.0,
};

const body: ContributionDto = {
  clientId: '18dfeb91-459a-4bc7-9cdd-d93b41f7bf62',
  planId: '30f6b23f-c93d-4cf9-8916-bcdb9fac83df',
  contribution: 50.0,
};

describe('ContributionController', () => {
  let contributionController: ContributionController;
  let contributionService: ContributionService;
  let planService: PlanService;
  let clientService: ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContributionController],
      providers: [
        {
          provide: ContributionService,
          useValue: {
            create: jest.fn().mockResolvedValue(contributionEntity),
          },
        },
        {
          provide: PlanService,
          useValue: {
            findOnePlanByUuid: jest.fn().mockResolvedValue(planEntity),
          },
        },
        {
          provide: ClientService,
          useValue: {
            findOneClientByUuid: jest.fn().mockResolvedValue(clientEntity),
          },
        },
      ],
    }).compile();

    contributionController = module.get<ContributionController>(
      ContributionController,
    );
    contributionService = module.get<ContributionService>(ContributionService);
    planService = module.get<PlanService>(PlanService);
    clientService = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(contributionController).toBeDefined();
    expect(contributionService).toBeDefined();
    expect(planService).toBeDefined();
    expect(clientService).toBeDefined();
  });

  describe('store', () => {
    it('should create a contribution successfully', async () => {
      const result = await contributionController.create(body);

      expect(contributionService.create).toHaveBeenCalledWith(body);
      expect(contributionService.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ id: contributionEntity.uuid });
    });

    it('should not create a contribution without a client', async () => {
      const errorMessage = 'Client not found.';

      const exceptionBody = {
        ...body,
        idCliente: '6f3f167d-d9e5-4cf7-a6e5-33410da4c77e',
      };

      jest.spyOn(clientService, 'findOneClientByUuid').mockResolvedValue(null);

      jest
        .spyOn(contributionService, 'create')
        .mockRejectedValue(new NotFoundException(errorMessage));

      expect(contributionController.create(exceptionBody)).rejects.toThrowError(
        errorMessage,
      );
      expect(contributionService.create).toHaveBeenCalledWith(exceptionBody);
    });

    it('should not create a contribution without a plan', async () => {
      const errorMessage = 'Plan not found.';

      const exceptionBody = {
        ...body,
        idPlano: '6f3f167d-d9e5-4cf7-a6e5-33410da4c77e',
      };

      jest.spyOn(planService, 'findOnePlanByUuid').mockResolvedValue(null);

      jest
        .spyOn(contributionService, 'create')
        .mockRejectedValue(new NotFoundException(errorMessage));

      expect(contributionController.create(exceptionBody)).rejects.toThrowError(
        errorMessage,
      );
      expect(contributionService.create).toHaveBeenCalledWith(exceptionBody);
    });

    it('should not create a contribution with a invalid min value', async () => {
      const errorMessage = `Contribution does not meet the minimum value of R$100.`;

      jest
        .spyOn(planService, 'findOnePlanByUuid')
        .mockResolvedValue({ ...planEntity, product: productEntity } as Plan);

      jest
        .spyOn(contributionService, 'create')
        .mockRejectedValue(new UnprocessableEntityException(errorMessage));

      expect(contributionController.create(body)).rejects.toThrowError(
        errorMessage,
      );
      expect(contributionService.create).toHaveBeenCalledWith(body);
    });
  });
});
