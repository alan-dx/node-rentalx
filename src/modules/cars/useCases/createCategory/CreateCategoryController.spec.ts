import request from 'supertest';

import { app } from '@shared/infra/http/app';

describe('CreateCategoryController', () => {
  test('test', async () => {
    await request(app).get('/cars/available').expect(200);
  });
});
