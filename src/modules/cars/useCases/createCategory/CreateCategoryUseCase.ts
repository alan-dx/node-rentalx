import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}
@injectable() // Esse decorator torna esse useCase "apto a ser injetável", ou seja, agora ele também pode ser injetado como dep usando o tsyringe
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository') // Fazendo a injeção de dependência usando o tsyringe (O CreateCategoryUseCase depende do CategoriesRepository)
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name,
    );

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists!');
    }

    await this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
