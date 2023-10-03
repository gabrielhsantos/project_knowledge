import {
  RedemptionBodyDto,
  RedemptionDto,
} from '@core/domain/dtos/redemption.dto';

export const redemptionRequestToDto = (
  redemptionBody: RedemptionBodyDto,
): RedemptionDto => {
  return {
    planUuid: redemptionBody.idPlano,
    redemptionValue: redemptionBody.valorResgate,
  };
};

export const redemptionResponse = (
  redemptionDB: RedemptionDto,
): { id: string } => {
  return {
    id: redemptionDB.uuid!,
  };
};
