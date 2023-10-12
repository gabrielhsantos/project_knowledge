import { IFindOneService } from '@core/domain/interfaces/service.interface';
import { Injectable } from '@nestjs/common';
import { UserBodyDto } from '@core/domain/dtos/user.dto';
import { UserRepository } from '@core/infrastructure/repositories/user.repository';
import { comparePassword } from '@shared/utils/password';
import { ForbiddenException, NotFoundException } from '@shared/exceptions';
import { generateToken } from '@shared/utils/security';

@Injectable()
export class LoginService
  implements IFindOneService<UserBodyDto, Promise<string>>
{
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(user: UserBodyDto): Promise<string> {
    const userExists = await this.userRepository.findOne({
      name: user.name,
      document: user.document,
    });

    if (!userExists) throw new NotFoundException('User not found.');

    const passIsValid = comparePassword(user.document, userExists.password);

    if (!passIsValid) throw new ForbiddenException();

    return generateToken(userExists.uuid);
  }
}
