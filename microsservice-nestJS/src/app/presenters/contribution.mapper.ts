import {
  ContributionDto,
  ContributionResponseDto,
} from '@core/domain/dtos/contribution.dto';

export const contributionResponse = (
  contributionDB: ContributionDto,
): ContributionResponseDto => {
  return {
    id: contributionDB.uuid!,
  };
};
