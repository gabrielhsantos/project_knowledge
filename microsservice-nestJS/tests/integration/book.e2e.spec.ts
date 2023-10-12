import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@modules/app.module';

describe('CreateBookController (e2e)', () => {
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

  it('/POST /books', async () => {
    const newBook = {
      name: 'The Lord of The Rings',
      value: 49.99,
      stock: 1,
    };

    const response = await request(app.getHttpServer())
      .post(`/books`)
      .send(newBook);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});
