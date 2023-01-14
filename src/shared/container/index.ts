import { container } from 'tsyringe';

import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository';

// ICategoriesRepository
container.registerSingleton<ICategoriesRepository>( // Como generic, é informado qual o protocolo da dependência
  'CategoriesRepository', // Um nome para identificar (chamado pela lib de injectionToken/token)
  CategoriesRepository, // Qual classe deve ser utilizada quando o 'CategoriesRepository' é chamado
);
