import { AppError } from '@errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory,
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  test('Should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '123433',
      email: 'user@test.com',
      password: '1234',
      name: 'User Test',
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  test('Should not be able to authenticate an nonexistent user', () => {
    // expect(async () => {
    //   await authenticateUserUseCase.execute({
    //     email: 'nonexistuser@email.com',
    //     password: '1234',
    //   });
    // }).rejects.toBeInstanceOf(AppError);

    const promise = authenticateUserUseCase.execute({
      email: 'nonexistuser@email.com',
      password: '1234',
    });

    expect(promise).rejects.toBeInstanceOf(AppError);
  });

  test('Should not be able to authenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      driver_license: '123433',
      email: 'user@test.com',
      password: '1234',
      name: 'User Test',
    };
    await createUserUseCase.execute(user);
    const promise = authenticateUserUseCase.execute({
      email: 'user@test.com',
      password: '12345',
    });

    expect(promise).rejects.toBeInstanceOf(AppError);
  });
});
