import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@modules/app.module';
import { TestModule } from '@modules/test/test.module';
import { TestSetupService } from '../setupTests';

describe('PlanController (e2e)', () => {
  let app: INestApplication;
  let testSetupService: TestSetupService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    testSetupService = moduleFixture.get(TestSetupService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/POST /plans', async () => {
    const newPlan = {
      idCliente: (await testSetupService.setupClient()).id,
      idProduto: (await testSetupService.setupProduct()).id,
      aporte: 2000.0,
      dataDaContratacao: '2023-04-05T12:00:00.000Z',
      idadeDeAposentadoria: 60,
    };

    const response = await request(app.getHttpServer())
      .post(`/plans`)
      .send(newPlan);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});
