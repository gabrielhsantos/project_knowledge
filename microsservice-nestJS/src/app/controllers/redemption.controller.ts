import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RedemptionService } from '@core/services/redemption.service';
import {
  RedemptionDto,
  RedemptionResponseDto,
} from '@core/domain/dtos/redemption.dto';
import { redemptionResponse } from '@app/presenters/redemption.mapper';
import { UnprocessableEntityException } from '@shared/exceptions/unprocessable-entity.exception';
import { NotFoundException } from '@shared/exceptions/not-found.exception';
import { InternalServerErrorException } from '@shared/exceptions/internal-server-error.exception';

@ApiTags('redemptions')
@Controller('redemptions')
export class RedemptionController {
  constructor(private readonly redemptionService: RedemptionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a redemption' })
  @ApiResponse({
    status: 201,
    description: 'Redemption created',
  })
  async create(
    @Body() redemptionDto: RedemptionDto,
  ): Promise<
    | RedemptionResponseDto
    | UnprocessableEntityException
    | NotFoundException
    | InternalServerErrorException
  > {
    try {
      const newRedemption = await this.redemptionService.create(redemptionDto);

      return redemptionResponse(newRedemption);
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
