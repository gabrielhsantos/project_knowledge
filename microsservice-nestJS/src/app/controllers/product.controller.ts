import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from '@core/services/product.service';
import {
  ProductBodyDto,
  ProductResponseDto,
} from '@core/domain/dtos/product.dto';
import {
  productRequestToDto,
  productResponse,
} from '@app/presenters/product.mapper';
import { UnprocessableEntityException } from '@shared/exceptions/unprocessable-entity.exception';
import { ConflictException } from '@shared/exceptions/conflict.exception';
import { InternalServerErrorException } from '@shared/exceptions/internal-server-error.exception';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastro de produtos' })
  @ApiResponse({
    status: 201,
    description: 'Produto cadastrado com sucesso',
  })
  @ApiResponse({
    status: 409,
    description: 'Produto já cadastrado',
  })
  async create(
    @Body() createProductDto: ProductBodyDto,
  ): Promise<
    | ProductResponseDto
    | UnprocessableEntityException
    | ConflictException
    | InternalServerErrorException
  > {
    try {
      const request = productRequestToDto(createProductDto);
      const newProduct = await this.productService.create(request);

      return productResponse(newProduct);
    } catch (error) {
      switch (error.status) {
        case HttpStatus.UNPROCESSABLE_ENTITY:
          throw new UnprocessableEntityException(error.message);
        case HttpStatus.CONFLICT:
          throw new ConflictException(error.message);
        default:
          throw new InternalServerErrorException(error.message);
      }
    }
  }
}
