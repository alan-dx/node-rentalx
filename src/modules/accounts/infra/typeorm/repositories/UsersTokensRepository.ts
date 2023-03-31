import { Repository, getRepository } from 'typeorm';

import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateTokenTokenDTO';
import { IUserTokensRepository } from '@modules/accounts/repositories/IUserTokensRepository';

import { UserTokens } from '../entities/UserTokens';

class UsersTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserTokens>;
  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens> {
    const userTokens = this.repository.findOne({ user_id, refresh_token });

    return userTokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = this.repository.findOne({ refresh_token });

    return userToken;
  }
}

export { UsersTokensRepository };
