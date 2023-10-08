import { ProductDto } from '@core/domain/dtos/product.dto';
import { ICreateService } from '@core/domain/interfaces/service.interface';
import { Product } from '@core/infrastructure/entities/product.entity';
import { ProductRepository } from '@core/infrastructure/repositories/product.repository';
import { Injectable } from '@nestjs/common';
import { ConflictException } from '@shared/exceptions/conflict.exception';
import { UnprocessableEntityException } from '@shared/exceptions/unprocessable-entity.exception';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductService
  implements ICreateService<ProductDto, Promise<Product>>
{
  constructor(private readonly productRepository: ProductRepository) {}

  async create(product: ProductDto): Promise<Product> {
    const { isValid, message } = await this.validateProduct(product);
    if (!isValid) throw new UnprocessableEntityException(message!);

    const productDb = await this.productRepository.findOneBySusep(
      product.susep,
    );
    if (productDb) throw new ConflictException('Product already registered.');

    const newProduct = await this.productRepository.create({
      uuid: uuidv4(),
      ...product,
    });

    return newProduct;
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
