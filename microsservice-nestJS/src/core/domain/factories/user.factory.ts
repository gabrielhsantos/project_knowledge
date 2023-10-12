import { User } from '@core/infrastructure/entities/user.entity';
import { UserDto } from '../dtos/user.dto';

export class UserFactory {
  public async create(user: UserDto): Promise<User> {
    return new User(user);
  }
}
