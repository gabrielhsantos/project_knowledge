import { ClientController } from '@app/controllers/client.controller';
import { ClientDto } from '@core/domain/dtos/client.dto';
import { Client } from '@core/infrastructure/entities/client.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from '@services/client.service';
import { ConflictException } from '@shared/exceptions/conflict.exception';

const clientEntity: Partial<Client> = {
  uuid: '5e480b27-7083-4c4f-a460-4f2cf4a27e3a',
};

const body: ClientDto = {
  document: '45645645600',
  name: 'José da Silva',
  email: 'jose@cliente.com',
  dob: new Date('2010-08-24T12:00:00.000Z'),
  gender: 'Masculino',
  income: 2899.5,
};

describe('ClientController', () => {
  let clientController: ClientController;
  let clientService: ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [
        {
          provide: ClientService,
          useValue: {
            create: jest.fn().mockResolvedValue(clientEntity),
            findOneClientByDocument: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    clientController = module.get<ClientController>(ClientController);
    clientService = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(clientController).toBeDefined();
    expect(clientService).toBeDefined();
  });

  describe('store', () => {
    it('should create a client successfully', async () => {
      const result = await clientController.create(body);

      expect(clientService.create).toHaveBeenCalledWith(body);
      expect(clientService.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ id: clientEntity.uuid });
    });

    it('should not create a client with same document', async () => {
      const errorMessage = 'Client already registered.';

      jest
        .spyOn(clientService, 'findOneClientByDocument')
        .mockResolvedValue(clientEntity as Client);

      jest
        .spyOn(clientService, 'create')
        .mockRejectedValue(new ConflictException(errorMessage));

      expect(clientController.create(body)).rejects.toThrowError(errorMessage);
      expect(clientService.create).toHaveBeenCalledWith(body);
      expect(clientService.create).toHaveBeenCalledTimes(1);
    });
  });
});
