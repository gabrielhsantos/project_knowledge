import { IProductRepository } from '@core/domain/interfaces/product.interface';
import { Product } from '@core/infrastructure/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {}

  async findOneByUuid(uuid: string): Promise<Product | null> {
    return await this.productModel.findOne({ where: { uuid } });
  }

  async findOneBySusep(susep: string): Promise<Product | null> {
    return await this.productModel.findOne({ where: { susep } });
  }

  async create(productData: any): Promise<Product> {
    return await this.productModel.create(productData);
  }
}
