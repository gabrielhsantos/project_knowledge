import 'reflect-metadata';
import { Injectable } from '@nestjs/common';
import { ProductService } from '@services/product.service';
import { ClientService } from '@services/client.service';
import { ClientResponseDto } from '@core/domain/dtos/client.dto';
import { clientRequestToDto } from '@app/presenters/client.mapper';
import { ProductResponseDto } from '@core/domain/dtos/product.dto';
import { productRequestToDto } from '@app/presenters/product.mapper';
import { PlanService } from '@services/plan.service';
import { planRequestToDto } from '@app/presenters/plan.mapper';

@Injectable()
export class TestSetupService {
  constructor(
    private readonly productService: ProductService,
    private readonly clientService: ClientService,
    private readonly planService: PlanService,
  ) {}

  async setupClient(): Promise<ClientResponseDto> {
    const client = await this.clientService.create(
      clientRequestToDto({
        cpf: '45645645600',
        nome: 'José da Silva',
        email: 'jose@cliente.com',
        dataDeNascimento: new Date('1963-08-24T12:00:00.000Z'),
        genero: 'Masculino',
        rendaMensal: 2899.5,
      }),
    );

    return {
      id: client.uuid,
    };
  }

  async setupProduct(): Promise<ProductResponseDto> {
    const product = await this.productService.create(
      productRequestToDto({
        nome: 'Brasilprev Longo Prazo',
        susep: '15414900840201817',
        expiracaoDeVenda: new Date('2025-01-01T12:00:00.000Z'),
        valorMinimoAporteInicial: 1000.0,
        valorMinimoAporteExtra: 100.0,
        idadeDeEntrada: 18,
        idadeDeSaida: 60,
        carenciaInicialDeResgate: 60,
        carenciaEntreResgates: 30,
      }),
    );

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

    const plan = await this.planService.create(
      planRequestToDto({
        idCliente: client.id,
        idProduto: product.id,
        aporte: 2000.0,
        dataDaContratacao: new Date('2022-04-05T12:00:00.000Z'),
        idadeDeAposentadoria: 60,
      }),
    );

    return {
      planId: plan.uuid,
      clientId: client.id,
      productId: product.id,
    };
  }
}
