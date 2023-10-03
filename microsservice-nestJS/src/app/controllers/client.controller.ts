import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientService } from '@core/services/client.service';
import { ClientDto, ClientResponseDto } from '@core/domain/dtos/client.dto';
import { clientResponse } from '@app/presenters/client.mapper';
import { ConflictException } from '@shared/exceptions/conflict.exception';
import { InternalServerErrorException } from '@shared/exceptions/internal-server-error.exception';

@ApiTags('clients')
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastro de clientes' })
  @ApiResponse({
    status: 201,
    description: 'Cliente cadastrado com sucesso',
  })
  @ApiResponse({
    status: 409,
    description: 'Cliente já cadastrado',
  })
  async create(
    @Body() clientDto: ClientDto,
  ): Promise<
    ClientResponseDto | ConflictException | InternalServerErrorException
  > {
    try {
      const newClient = await this.clientService.create(clientDto);

      return clientResponse(newClient);
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
