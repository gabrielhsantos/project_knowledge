import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '@core/infrastructure/entities/user.entity';
import { UserRepository } from '@core/infrastructure/repositories/user.repository';
import { Cart } from '@core/infrastructure/entities/cart.entity';
import { LoginService } from '@services/auth/login.service';
import { LoginController } from '@app/controllers/auth/login.controller';

@Module({
  imports: [SequelizeModule.forFeature([User, Cart])],
  providers: [LoginService, UserRepository],
  controllers: [LoginController],
})
export class LoginModule {}
