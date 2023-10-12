import { LoginController } from '@app/controllers/auth/login.controller';
import { CartController } from '@app/controllers/cart/create-cart.controller';
import { AuthMiddleware } from '@app/middlewares/auth.middleware';
import { LoggerMiddleware } from '@app/middlewares/logger.middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

@Module({
  imports: [],
  providers: [],
  controllers: [],
})
export class MiddlwareModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(LoginController);
    consumer.apply(AuthMiddleware).forRoutes(CartController);
  }
}
