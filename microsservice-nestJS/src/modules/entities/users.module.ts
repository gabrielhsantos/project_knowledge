import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '@core/infrastructure/entities/user.entity';
import { UserFactory } from '@core/domain/factories/user.factory';
import { UserRepository } from '@core/infrastructure/repositories/user.repository';
import { CreateUserService } from '@services/user/create-user.service';
import { CreateUserController } from '@app/controllers/user/create-user.controller';
import { Cart } from '@core/infrastructure/entities/cart.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, Cart])],
  providers: [CreateUserService, UserRepository, UserFactory],
  controllers: [CreateUserController],
})
export class UserModule {}
