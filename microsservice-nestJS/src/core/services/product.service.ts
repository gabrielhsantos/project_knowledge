import { ProductDto } from '@core/domain/dtos/product.dto';
import { Product } from '@core/infrastructure/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConflictException } from '@shared/exceptions/conflict.exception';
import { UnprocessableEntityException } from '@shared/exceptions/unprocessable-entity.exception';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {}

  async create(product: ProductDto): Promise<Product> {
    const { isValid, message } = await this.validateProduct(product);
    if (!isValid) throw new UnprocessableEntityException(message!);

    const productDb = await this.findOneProductBySusep(product.susep);
    if (productDb) throw new ConflictException('Product already registered.');

    const newProduct = await this.productModel.create({
      uuid: uuidv4(),
      ...product,
    });

    return newProduct;
  }

  async findOneProductByUuid(uuid: string): Promise<Product | null> {
    return await this.productModel.findOne({ where: { uuid } });
  }

  async findOneProductBySusep(susep: string): Promise<Product | null> {
    return await this.productModel.findOne({ where: { susep } });
  }

  private async validateProduct(
    product: ProductDto,
  ): Promise<{ isValid: boolean; message?: string }> {
    const saleExpirationDate = new Date(product.saleExpiration);
    if (saleExpirationDate <= new Date()) {
      return { isValid: false, message: 'Wrong date to saleExpiration field.' };
    }

    return { isValid: true };
  }
}
