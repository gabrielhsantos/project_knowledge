import { User } from '@core/infrastructure/entities/user.entity';

export interface IUserRepository {
  create(data: User): Promise<User>;
  findOne(filters: Partial<User>): Promise<User | null>;
}
