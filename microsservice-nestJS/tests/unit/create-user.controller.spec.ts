import { CreateUserController } from '@app/controllers/user/create-user.controller';
import { UserBodyDto } from '@core/domain/dtos/user.dto';
import { UserFactory } from '@core/domain/factories/user.factory';
import { User } from '@core/infrastructure/entities/user.entity';
import { UserRepository } from '@core/infrastructure/repositories/user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserService } from '@services/user/create-user.service';

const userEntity: Partial<User> = {
  uuid: '5e480b27-7083-4c4f-a460-4f2cf4a27e3a',
};

const body: UserBodyDto = {
  name: 'Thomas',
  document: '45645645600',
};

describe('CreateUserController', () => {
  let createUserController: CreateUserController;
  let createUserService: CreateUserService;
  let userRepository: UserRepository;
  let userFactory: UserFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [
        {
          provide: CreateUserService,
          useValue: {
            create: jest.fn().mockResolvedValue(userEntity),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn().mockResolvedValue(userEntity),
            findOne: jest.fn().mockResolvedValue(userEntity),
          },
        },
        {
          provide: UserFactory,
          useValue: {
            create: jest.fn().mockResolvedValue(userEntity),
          },
        },
      ],
    }).compile();

    createUserController =
      module.get<CreateUserController>(CreateUserController);
    createUserService = module.get<CreateUserService>(CreateUserService);
    userRepository = module.get<UserRepository>(UserRepository);
    userFactory = module.get<UserFactory>(UserFactory);
  });

  it('should be defined', () => {
    expect(createUserController).toBeDefined();
    expect(createUserService).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(userFactory).toBeDefined();
  });

  describe('store', () => {
    it('should create a user successfully', async () => {
      const result = await createUserController.handle(body);

      expect(createUserService.create).toHaveBeenCalledWith(body);
      expect(createUserService.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ id: userEntity.uuid });
    });
  });
});
