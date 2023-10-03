import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlanService } from '@core/services/plan.service';
import { PlanBodyDto } from '@core/domain/dtos/plan.dto';
import { planRequestToDto, planResponse } from '@app/presenters/plan.mapper';
import { ProductResponseDto } from '@core/domain/dtos/product.dto';
import { UnprocessableEntityException } from '@shared/exceptions/unprocessable-entity.exception';
import { InternalServerErrorException } from '@shared/exceptions/internal-server-error.exception';
import { NotFoundException } from '@shared/exceptions/not-found.exception';

@ApiTags('plans')
@Controller('plans')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastro de planos' })
  @ApiResponse({
    status: 201,
    description: 'Plano cadastrado com sucesso',
  })
  async create(
    @Body() createPlanDto: PlanBodyDto,
  ): Promise<
    | ProductResponseDto
    | UnprocessableEntityException
    | NotFoundException
    | InternalServerErrorException
  > {
    try {
      const request = planRequestToDto(createPlanDto);
      const newPlan = await this.planService.create(request);

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
