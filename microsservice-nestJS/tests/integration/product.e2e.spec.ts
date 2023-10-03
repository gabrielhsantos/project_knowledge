import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@modules/app.module';

describe('ProductController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/POST /products', async () => {
    const newProduct = {
      nome: 'Brasilprev Longo Prazo',
      susep: '15414900840201817',
      expiracaoDeVenda: '2026-01-01T12:00:00.000Z',
      valorMinimoAporteInicial: 1000.0,
      valorMinimoAporteExtra: 100.0,
      idadeDeEntrada: 18,
      idadeDeSaida: 60,
      carenciaInicialDeResgate: 60,
      carenciaEntreResgates: 30,
    };

    const response = await request(app.getHttpServer())
      .post(`/products`)
      .send(newProduct);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});
