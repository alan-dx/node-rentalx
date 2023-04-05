import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';

interface IRequest {
  user_id: string;
  avatar_filename: string;
}
@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ avatar_filename, user_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (user.avatar) await this.storageProvider.delete(user.avatar, 'avatar');

    await this.storageProvider.save(avatar_filename, 'avatar');

    user.avatar = avatar_filename;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
