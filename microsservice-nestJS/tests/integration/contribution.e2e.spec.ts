import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@modules/app.module';
import { TestModule } from '@modules/test/test.module';
import { TestSetupService } from '../setupTests';

describe('ContributionController (e2e)', () => {
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

  it('/POST /contributions', async () => {
    const { clientId, planId } = await testSetupService.setupPlan();

    const newContribution = {
      clientId,
      planId,
      contribution: 100.0,
    };

    const response = await request(app.getHttpServer())
      .post(`/contributions`)
      .send(newContribution);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});
