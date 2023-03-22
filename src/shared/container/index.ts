import { container } from 'tsyringe';

import '@shared/container/providers';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { CarsImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalRepository';

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

// ICarsRepository
container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

// ICarsImageRepository
container.registerSingleton<ICarsImageRepository>(
  'CarsImageRepository',
  CarsImagesRepository,
);

// ICarsImageRepository
container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository,
);
