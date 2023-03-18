import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
describe('CreateCategoryController', () => {
  beforeAll(async () => {
    connection = await createConnection(); // Criando a conexao com o banco de dados de teste (a definicao do host foi definida por variavel ambiente)
    await connection.runMigrations();

    const password = await hash('admin', 8);
    const id = uuidV4();

    await connection.query(
      // Fazendo o seed do usuario admin no banco de dados de teste
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) 
      values('${id}', 'admin', 'admin@rentalx.com.br', '${password}', true, 'now()', 'XXXXXX')`,
    );
  });

  afterAll(async () => {
    // Limpando o banco de dados e encerrando a conexao depois de cada teste
    await connection.dropDatabase();
    await connection.close();
  });

  test('should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      // FAzendo a request pra autenticar
      email: 'admin@rentalx.com.br',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest',
        description: 'Category Supertest',
      })
      .set({
        // Definindo o header de autenticacao
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });
});
