import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlanService } from '@core/services/plan.service';
import { PlanDto, PlanResponseDto } from '@core/domain/dtos/plan.dto';
import { planResponse } from '@app/presenters/plan.mapper';
import { UnprocessableEntityException } from '@shared/exceptions/unprocessable-entity.exception';
import { InternalServerErrorException } from '@shared/exceptions/internal-server-error.exception';
import { NotFoundException } from '@shared/exceptions/not-found.exception';
import { IRequestHandler } from '@core/domain/interfaces/request-handler.interface';

type handleResponse =
  | PlanResponseDto
  | UnprocessableEntityException
  | NotFoundException
  | InternalServerErrorException;

@ApiTags('plans')
@Controller('plans')
export class PlanController
  implements IRequestHandler<Promise<handleResponse>>
{
  constructor(private readonly planService: PlanService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastro de planos' })
  @ApiResponse({
    status: 201,
    description: 'Plano cadastrado com sucesso',
  })
  async handle(@Body() createPlanDto: PlanDto): Promise<handleResponse> {
    try {
      const newPlan = await this.planService.create(createPlanDto);

      return planResponse(newPlan);
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
