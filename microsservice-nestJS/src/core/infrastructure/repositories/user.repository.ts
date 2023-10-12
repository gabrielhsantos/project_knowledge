import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IUserRepository } from '@core/domain/interfaces/user.interface';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create({ dataValues }: User): Promise<User> {
    return await this.userModel.create(dataValues);
  }

  async findOne(filters: Partial<User>): Promise<User | null> {
    return await this.userModel.findOne({ where: filters });
  }
}
