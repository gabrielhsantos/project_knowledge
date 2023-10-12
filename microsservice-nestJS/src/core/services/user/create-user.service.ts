import { ICreateService } from '@core/domain/interfaces/service.interface';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@core/infrastructure/entities/user.entity';
import { UserBodyDto } from '@core/domain/dtos/user.dto';
import { UserRepository } from '@core/infrastructure/repositories/user.repository';
import { UserFactory } from '@core/domain/factories/user.factory';
import { encryptPassword } from '@shared/utils/password';
import { ConflictException } from '@shared/exceptions/conflict.exception';

@Injectable()
export class CreateUserService
  implements ICreateService<UserBodyDto, Promise<User>>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFactory: UserFactory,
  ) {}

  async create(user: UserBodyDto): Promise<User> {
    const userAlreadyExists = await this.userRepository.findOne({
      document: user.document,
    });

    if (userAlreadyExists)
      throw new ConflictException('User already registered.');

    const userDto = await this.userFactory.create({
      uuid: uuidv4(),
      name: user.name,
      document: user.document,
      password: encryptPassword(user.document),
    });

    return await this.userRepository.create(userDto);
  }
}
