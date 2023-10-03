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
      name: 'Brasilprev Longo Prazo',
      susep: '15414900840201817',
      saleExpiration: '2026-01-01T12:00:00.000Z',
      minimumInitialContributionValue: 1000.0,
      minimumValueExtraContribution: 100.0,
      entryAge: 18,
      exitAge: 60,
      initialRescueGracePeriod: 60,
      rescueBetweenGracePeriods: 30,
    };

    const response = await request(app.getHttpServer())
      .post(`/products`)
      .send(newProduct);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});
