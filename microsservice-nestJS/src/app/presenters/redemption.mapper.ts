import {
  RedemptionDto,
  RedemptionResponseDto,
} from '@core/domain/dtos/redemption.dto';

export const redemptionResponse = (
  redemptionDB: RedemptionDto,
): RedemptionResponseDto => {
  return {
    id: redemptionDB.uuid!,
  };
};
