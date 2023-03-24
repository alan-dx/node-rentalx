import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { password, email } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const authContent = await authenticateUserUseCase.execute({
      email,
      password,
    });

    return response.json(authContent);
  }
}

export { AuthenticateUserController };
