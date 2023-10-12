import { Module } from '@nestjs/common';
import { ConfigModule } from '@modules/env/config.module';
import { DatabaseModule } from '@modules/database/database.module';
import { CartModule } from './entities/carts.module';
import { MiddlwareModule } from './middleware/middleware.module';
import { BookModule } from './entities/books.module';
import { UserModule } from './entities/users.module';
import { LoginModule } from './auth/login.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    MiddlwareModule,
    BookModule,
    UserModule,
    LoginModule,
    CartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
