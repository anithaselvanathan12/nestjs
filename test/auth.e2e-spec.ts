import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication system (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('it handles user signup', () => {
    const email = 'drfertertdsfsf@ddfg.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'sadfad' })
      .expect(201)
      .then((res: any) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });

  // it('signup user after loggedin ', async () => {
  //   const email = 'testuser99@ddfg.com';
  //   const res = request(app.getHttpServer())
  //     .post('/auth/signup')
  //     .send({ email, password: 'sadfad' })
  //     .expect(201);
  //   const cookie = res.get('Set-Cookie');
  //   console.log('cookie----------------------', res);
  //   const { body } = await request(app.getHttpServer())
  //     .get('/auth/whoami')
  //     .set('Cookie', cookie)
  //     .expect(200);

  //   expect(body.email).toEqual(email);
  // });
});
