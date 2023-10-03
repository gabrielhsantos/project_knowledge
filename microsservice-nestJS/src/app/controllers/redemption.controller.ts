import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RedemptionService } from '@core/services/redemption.service';
import { RedemptionBodyDto } from '@core/domain/dtos/redemption.dto';
import {
  redemptionRequestToDto,
  redemptionResponse,
} from '@app/presenters/redemption.mapper';

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
  async create(@Body() redemptionBodyDto: RedemptionBodyDto): Promise<any> {
    const request = redemptionRequestToDto(redemptionBodyDto);
    const newRedemption = await this.redemptionService.create(request);

    return redemptionResponse(newRedemption);
  }
}
