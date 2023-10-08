import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from '@core/infrastructure/entities/product.entity';
import { ProductService } from '@services/product.service';
import { ProductController } from '@app/controllers/product.controller';
import { ProductRepository } from '@core/infrastructure/repositories/product.repository';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  providers: [ProductService, ProductRepository],
  controllers: [ProductController],
})
export class ProductModule {}
