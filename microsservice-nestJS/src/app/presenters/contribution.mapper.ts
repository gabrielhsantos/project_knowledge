import {
  ContributionBodyDto,
  ContributionDto,
} from '@core/domain/dtos/contribution.dto';

export const contributionRequestToDto = (
  contributionBody: ContributionBodyDto,
): ContributionDto => {
  return {
    clientUuid: contributionBody.idCliente,
    planUuid: contributionBody.idPlano,
    contribution: contributionBody.valorAporte,
  };
};

export const contributionResponse = (
  contributionDB: ContributionDto,
): { id: string } => {
  return {
    id: contributionDB.uuid!,
  };
};
