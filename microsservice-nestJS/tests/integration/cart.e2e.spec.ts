import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@modules/app.module';
import { TestModule } from '@modules/test/test.module';
import { TestSetupService } from '../setupTests';
import { generateToken } from '@shared/utils/security';

describe('CreateCartController (e2e)', () => {
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

  it('/POST /carts', async () => {
    const book = await testSetupService.setupBook();
    const user = await testSetupService.setupUser();

    const token = generateToken(user.id, 'test');

    const newCart = {
      books: [
        {
          id: book.id,
          qty: 1,
        },
      ],
    };

    const response = await request(app.getHttpServer())
      .post(`/carts`)
      .set({ Authorization: token })
      .send(newCart);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});
