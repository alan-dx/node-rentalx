import { inject, injectable } from 'tsyringe';

import { IUserResponseDTO } from '@modules/accounts/dtos/IUserResponseDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { UserMap } from '@modules/accounts/mapper/UserMap';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

@injectable()
class ProfileUserUserCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  async execute(user_id: string): Promise<IUserResponseDTO> {
    const user = await this.userRepository.findById(user_id);

    return UserMap.toDTO(user);
  }
}

export { ProfileUserUserCase };
