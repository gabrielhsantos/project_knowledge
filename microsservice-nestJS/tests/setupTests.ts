import 'reflect-metadata';
import { Injectable } from '@nestjs/common';
import { ProductService } from '@services/product.service';
import { ClientService } from '@services/client.service';
import { ClientResponseDto } from '@core/domain/dtos/client.dto';
import { ProductResponseDto } from '@core/domain/dtos/product.dto';
import { PlanService } from '@services/plan.service';

@Injectable()
export class TestSetupService {
  constructor(
    private readonly productService: ProductService,
    private readonly clientService: ClientService,
    private readonly planService: PlanService,
  ) {}

  async setupClient(): Promise<ClientResponseDto> {
    const client = await this.clientService.create({
      document: '45645645600',
      name: 'José da Silva',
      email: 'jose@cliente.com',
      dob: new Date('1963-08-24T12:00:00.000Z'),
      gender: 'Masculino',
      income: 2899.5,
    });

    return {
      id: client.uuid,
    };
  }

  async setupProduct(): Promise<ProductResponseDto> {
    const product = await this.productService.create({
      name: 'Brasilprev Longo Prazo',
      susep: '15414900840201817',
      saleExpiration: new Date('2025-01-01T12:00:00.000Z'),
      minimumInitialContributionValue: 1000.0,
      minimumValueExtraContribution: 100.0,
      entryAge: 18,
      exitAge: 60,
      initialRescueGracePeriod: 60,
      rescueBetweenGracePeriods: 30,
    });

    return {
      id: product.uuid,
    };
  }

  async setupPlan(): Promise<{
    planId: string;
    clientId: string;
    productId: string;
  }> {
    const client = await this.setupClient();
    const product = await this.setupProduct();

    const plan = await this.planService.create({
      clientId: client.id,
      productId: product.id,
      contribution: 2000.0,
      subscriptionDate: new Date('2022-04-05T12:00:00.000Z'),
      retirementAge: 60,
    });

    return {
      planId: plan.uuid,
      clientId: client.id,
      productId: product.id,
    };
  }
}
