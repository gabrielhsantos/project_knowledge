import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InternalServerErrorException } from '@shared/exceptions/internal-server-error.exception';
import { IRequestHandler } from '@core/domain/interfaces/request-handler.interface';
import { UserBodyDto } from '@core/domain/dtos/user.dto';
import { ForbiddenException, NotFoundException } from '@shared/exceptions';
import { LoginService } from '@services/auth/login.service';

type handleResponse =
  | { token: string }
  | NotFoundException
  | ForbiddenException
  | InternalServerErrorException;

@ApiTags('login')
@Controller('login')
export class LoginController
  implements IRequestHandler<Promise<handleResponse>>
{
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @ApiOperation({ summary: 'Login de usuários.' })
  @ApiResponse({
    status: 200,
    description: 'Token gerado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado.',
  })
  async handle(@Body() userBodyDto: UserBodyDto): Promise<handleResponse> {
    try {
      const token = await this.loginService.findOne(userBodyDto);

      return { token };
    } catch (error) {
      switch (error.status) {
        case HttpStatus.NOT_FOUND:
          throw new NotFoundException(error.message);
        case HttpStatus.FORBIDDEN:
          throw new ForbiddenException();
        default:
          throw new InternalServerErrorException(error.message);
      }
    }
  }
}
