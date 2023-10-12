import { Controller, Post, Body, HttpStatus, Headers } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InternalServerErrorException } from '@shared/exceptions/internal-server-error.exception';
import { IRequestHandler } from '@core/domain/interfaces/request-handler.interface';
import { CartBodyDto, CartResponseDto } from '@core/domain/dtos/cart.dto';
import { CreateCartService } from '@services/cart/create-cart.service';
import { cartResponse } from '@app/presenters/cart.mapper';
import { NotFoundException } from '@shared/exceptions';
import { UnprocessableEntityException } from '@shared/exceptions/unprocessable-entity.exception';

type handleResponse =
  | CartResponseDto
  | NotFoundException
  | UnprocessableEntityException
  | InternalServerErrorException;

@ApiTags('carts')
@Controller('carts')
@ApiHeader({
  name: 'authorization',
  description: 'Auth token',
})
export class CreateCartController
  implements IRequestHandler<Promise<handleResponse>>
{
  constructor(private readonly cartService: CreateCartService) {}

  @Post()
  @ApiOperation({ summary: 'Inserção de livros no carrinho de compras.' })
  @ApiResponse({
    status: 201,
    description: 'Carrinho de compras criado com sucesso.',
  })
  async handle(
    @Body() cartBodyDto: CartBodyDto,
    @Headers() headers: { userId: string },
  ): Promise<handleResponse> {
    try {
      const userId = headers.userId;
      const newCart = await this.cartService.create(cartBodyDto, userId);

      return cartResponse(newCart);
    } catch (error) {
      switch (error.status) {
        case HttpStatus.NOT_FOUND:
          throw new NotFoundException(error.message);
        case HttpStatus.UNPROCESSABLE_ENTITY:
          throw new UnprocessableEntityException(error.message);
        default:
          throw new InternalServerErrorException(error.message);
      }
    }
  }
}
