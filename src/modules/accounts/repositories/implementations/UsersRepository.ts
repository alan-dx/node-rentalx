import { Repository, getRepository } from 'typeorm';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    // username,
    driver_license,
    password,
    email,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      // username,
      driver_license,
      password,
      email,
    });

    await this.repository.save(user);
  }
}

export { UsersRepository };
