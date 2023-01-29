import { container } from 'tsyringe';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';

// ICategoriesRepository
container.registerSingleton<ICategoriesRepository>( // Como generic, é informado qual o protocolo da dependência
  'CategoriesRepository', // Um nome para identificar (chamado pela lib de injectionToken/token)
  CategoriesRepository, // Qual classe deve ser utilizada quando o 'CategoriesRepository' é chamado
);

// ISpecificationRepository
container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository,
);

// IUserRepository
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
