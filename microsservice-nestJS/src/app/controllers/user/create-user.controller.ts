import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConflictException } from '@shared/exceptions/conflict.exception';
import { InternalServerErrorException } from '@shared/exceptions/internal-server-error.exception';
import { IRequestHandler } from '@core/domain/interfaces/request-handler.interface';
import { UserBodyDto, UserResponseDto } from '@core/domain/dtos/user.dto';
import { CreateUserService } from '@services/user/create-user.service';
import { userResponse } from '@app/presenters/user.mapper';

type handleResponse =
  | UserResponseDto
  | ConflictException
  | InternalServerErrorException;

@ApiTags('users')
@Controller('users')
export class CreateUserController
  implements IRequestHandler<Promise<handleResponse>>
{
  constructor(private readonly userService: CreateUserService) {}

  @Post()
  @ApiOperation({ summary: 'Criação de usuários.' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso.',
  })
  @ApiResponse({
    status: 409,
    description: 'Usuário já cadastrado.',
  })
  async handle(@Body() userBodyDto: UserBodyDto): Promise<handleResponse> {
    try {
      const newUser = await this.userService.create(userBodyDto);

      return userResponse(newUser);
    } catch (error) {
      switch (error.status) {
        case HttpStatus.CONFLICT:
          throw new ConflictException(error.message);
        default:
          throw new InternalServerErrorException(error.message);
      }
    }
  }
}
