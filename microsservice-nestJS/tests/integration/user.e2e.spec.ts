import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@modules/app.module';

describe('CreateUserController (e2e)', () => {
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

  it('/POST /users', async () => {
    const newUser = {
      name: 'Thomas',
      document: '45645645601',
    };

    const response = await request(app.getHttpServer())
      .post(`/users`)
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});
