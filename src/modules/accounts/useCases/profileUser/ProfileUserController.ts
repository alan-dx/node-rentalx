import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ProfileUserUserCase } from './ProfileUserUserCase';

class ProfileUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const profileUSerUseCase = container.resolve(ProfileUserUserCase);

    const user = await profileUSerUseCase.execute(id);

    return response.json(user);
  }
}

export { ProfileUserController };
