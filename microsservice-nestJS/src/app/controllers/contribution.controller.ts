import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContributionService } from '@core/services/contribution.service';
import {
  ContributionDto,
  ContributionResponseDto,
} from '@core/domain/dtos/contribution.dto';
import { contributionResponse } from '@app/presenters/contribution.mapper';
import { UnprocessableEntityException } from '@shared/exceptions/unprocessable-entity.exception';
import { NotFoundException } from '@shared/exceptions';
import { InternalServerErrorException } from '@shared/exceptions/internal-server-error.exception';
import { IRequestHandler } from '@core/domain/interfaces/request-handler.interface';

type handleResponse =
  | ContributionResponseDto
  | UnprocessableEntityException
  | NotFoundException
  | InternalServerErrorException;

@ApiTags('contributions')
@Controller('contributions')
export class ContributionController
  implements IRequestHandler<Promise<handleResponse>>
{
  constructor(private readonly contributionService: ContributionService) {}

  @Post()
  @ApiOperation({ summary: 'Inserção do valor do aporte' })
  @ApiResponse({
    status: 201,
    description: 'Aporte inserido com sucesso',
  })
  async handle(
    @Body() contributionDto: ContributionDto,
  ): Promise<handleResponse> {
    try {
      const newContribution =
        await this.contributionService.create(contributionDto);

      return contributionResponse(newContribution);
    } catch (error) {
      switch (error.status) {
        case HttpStatus.UNPROCESSABLE_ENTITY:
          throw new UnprocessableEntityException(error.message);
        case HttpStatus.NOT_FOUND:
          throw new NotFoundException(error.message);
        default:
          throw new InternalServerErrorException(error.message);
      }
    }
  }
}
