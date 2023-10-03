import { PlanDto, PlanBodyDto } from '@core/domain/dtos/plan.dto';

export const planRequestToDto = (planBody: PlanBodyDto): PlanDto => {
  return {
    clientUuid: planBody.idCliente,
    productUuid: planBody.idProduto,
    contribution: planBody.aporte,
    subscriptionDate: planBody.dataDaContratacao,
    retirementAge: planBody.idadeDeAposentadoria,
  };
};

export const planResponse = (planDB: PlanDto): { id: string } => {
  return {
    id: planDB.uuid!,
  };
};
