import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from '@core/services/product.service';
import { ProductDto, ProductResponseDto } from '@core/domain/dtos/product.dto';
import { productResponse } from '@app/presenters/product.mapper';
import { UnprocessableEntityException } from '@shared/exceptions/unprocessable-entity.exception';
import { ConflictException } from '@shared/exceptions/conflict.exception';
import { InternalServerErrorException } from '@shared/exceptions/internal-server-error.exception';
import { IRequestHandler } from '@core/domain/interfaces/request-handler.interface';

type handleResponse =
  | ProductResponseDto
  | UnprocessableEntityException
  | ConflictException
  | InternalServerErrorException;

@ApiTags('products')
@Controller('products')
export class ProductController
  implements IRequestHandler<Promise<handleResponse>>
{
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
  async handle(@Body() createProductDto: ProductDto): Promise<handleResponse> {
    try {
      const newProduct = await this.productService.create(createProductDto);

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
