import { RedemptionController } from '@app/controllers/redemption.controller';
import { RedemptionDto } from '@core/domain/dtos/redemption.dto';
import { Client } from '@core/infrastructure/entities/client.entity';
import { Plan } from '@core/infrastructure/entities/plan.entity';
import { Product } from '@core/infrastructure/entities/product.entity';
import { Redemption } from '@core/infrastructure/entities/redemption.entity';
import { ContributionRepository } from '@core/infrastructure/repositories/contribution.repository';
import { PlanRepository } from '@core/infrastructure/repositories/plan.repository';
import { RedemptionRepository } from '@core/infrastructure/repositories/redemption.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { RedemptionService } from '@services/redemption.service';
import { NotFoundException } from '@shared/exceptions/not-found.exception';
import { UnprocessableEntityException } from '@shared/exceptions/unprocessable-entity.exception';

const redemptionEntity: Partial<Redemption> = {
  uuid: 'a483d56e-8f9e-43c4-a268-0affcdbd9ea2',
};

const contributionTotal: number = 2100.0;

const planEntity: Partial<Plan> = {
  uuid: '5e480b27-7083-4c4f-a460-4f2cf4a27e3a',
};

const productEntity: Partial<Product> = {
  uuid: '30f6b23f-c93d-4cf9-8916-bcdb9fac83df',
};

const clientEntity: Partial<Client> = {
  uuid: '18dfeb91-459a-4bc7-9cdd-d93b41f7bf62',
};

const body: RedemptionDto = {
  planId: '98add7e5-1475-4af0-8478-8a94965e7000',
  redemptionValue: 1000.0,
};

describe('RedemptionController', () => {
  let redemptionController: RedemptionController;
  let redemptionService: RedemptionService;
  let redemptionRepository: RedemptionRepository;
  let planRepository: PlanRepository;
  let contributionRepository: ContributionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RedemptionController],
      providers: [
        {
          provide: RedemptionService,
          useValue: {
            create: jest.fn().mockResolvedValue(redemptionEntity),
          },
        },
        {
          provide: RedemptionRepository,
          useValue: {
            create: jest.fn().mockResolvedValue(redemptionEntity),
          },
        },
        {
          provide: ContributionRepository,
          useValue: {
            getTotalContributionByPlanId: jest
              .fn()
              .mockResolvedValue(contributionTotal),
          },
        },
        {
          provide: PlanRepository,
          useValue: {
            findOneByUuid: jest.fn().mockResolvedValue(planEntity),
          },
        },
      ],
    }).compile();

    redemptionController =
      module.get<RedemptionController>(RedemptionController);
    redemptionService = module.get<RedemptionService>(RedemptionService);
    redemptionRepository =
      module.get<RedemptionRepository>(RedemptionRepository);
    planRepository = module.get<PlanRepository>(PlanRepository);
    contributionRepository = module.get<ContributionRepository>(
      ContributionRepository,
    );
  });

  it('should be defined', () => {
    expect(redemptionController).toBeDefined();
    expect(redemptionService).toBeDefined();
    expect(redemptionRepository).toBeDefined();
    expect(planRepository).toBeDefined();
    expect(contributionRepository).toBeDefined();
  });

  describe('store', () => {
    it('should create a redemption register successfully', async () => {
      const result = await redemptionController.handle(body);

      expect(result).toEqual({ id: redemptionEntity.uuid });
      expect(redemptionService.create).toHaveBeenCalledTimes(1);
      expect(redemptionService.create).toHaveBeenCalledWith(body);
    });

    it('should not create a redemption register without a plan', async () => {
      const errorMessage = 'Plan not found.';

      const exceptionBody = {
        ...body,
        idPlano: '6f3f167d-d9e5-4cf7-a6e5-33410da4c77e',
      };

      jest.spyOn(planRepository, 'findOneByUuid').mockResolvedValue(null);

      jest
        .spyOn(redemptionService, 'create')
        .mockRejectedValue(new NotFoundException(errorMessage));

      expect(redemptionController.handle(exceptionBody)).rejects.toThrowError(
        errorMessage,
      );
      expect(redemptionService.create).toHaveBeenCalledWith(exceptionBody);
    });

    it('should not create a redemption with a invalid age', async () => {
      const errorMessage = 'Invalid age to redeem values.';

      jest.spyOn(planRepository, 'findOneByUuid').mockResolvedValue({
        ...planEntity,
        retirementAge: 60,
        client: {
          ...clientEntity,
          dob: new Date('2020-08-24T12:00:00.000Z'),
        },
      } as Plan);

      jest
        .spyOn(redemptionService, 'create')
        .mockRejectedValue(new UnprocessableEntityException(errorMessage));

      expect(redemptionController.handle(body)).rejects.toThrowError(
        errorMessage,
      );
    });

    it('should not create a redemption with a invalid date to redeem values', async () => {
      const errorMessage = 'Invalid date to redeem values.';

      jest.spyOn(planRepository, 'findOneByUuid').mockResolvedValue({
        ...planEntity,
        retirementAge: 60,
        subscriptionDate: new Date(),
        product: {
          ...productEntity,
          initialRescueGracePeriod: 60,
        },
        client: {
          ...clientEntity,
          dob: new Date('1955-08-24T12:00:00.000Z'),
        },
      } as Plan);

      jest
        .spyOn(redemptionService, 'create')
        .mockRejectedValue(new UnprocessableEntityException(errorMessage));

      expect(redemptionController.handle(body)).rejects.toThrowError(
        errorMessage,
      );
    });

    it('should not create a redemption without redemption limit.', async () => {
      const errorMessage =
        'Amount requested above the available redemption limit.';

      jest
        .spyOn(contributionRepository, 'getTotalContributionByPlanId')
        .mockResolvedValue(100.0);

      jest
        .spyOn(redemptionService, 'create')
        .mockRejectedValue(new UnprocessableEntityException(errorMessage));

      expect(redemptionController.handle(body)).rejects.toThrowError(
        errorMessage,
      );
    });
  });
});
