import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@modules/app.module';

describe('ClienteController (e2e)', () => {
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

  it('/POST /clients', async () => {
    const newClient = {
      cpf: '45645645600',
      nome: 'José da Silva',
      email: 'jose@cliente.com',
      dataDeNascimento: '2010-08-24T12:00:00.000Z',
      genero: 'Masculino',
      rendaMensal: 2899.5,
    };

    const response = await request(app.getHttpServer())
      .post(`/clients`)
      .send(newClient);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});
