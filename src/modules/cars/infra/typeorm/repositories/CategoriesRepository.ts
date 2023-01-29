import { getRepository, Repository } from 'typeorm';

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '@modules/cars/repositories/ICategoriesRepository';

import { Category } from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>; // É a instancia do Repository do typeorm que dara acesso a todos os metodos do ORM, permitindo assim alterar os dados no banco. Esse metodos serão utilizados para manipular os dados
  // private static INSTANCE: CategoriesRepository; // Atributo de classe

  constructor() {
    this.repository = getRepository(Category); // Vai gerar o repository do typeORM utilizando a Entity Category
  }

  // public static getInstance(): CategoriesRepository {
  //   // metodo de classe
  //   if (!CategoriesRepository.INSTANCE) {
  //     CategoriesRepository.INSTANCE = new CategoriesRepository();
  //   }

  //   return CategoriesRepository.INSTANCE;
  // }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      // Cria uma nova entidade de fato, utilizando a Entity Category como base
      description,
      name,
    });

    await this.repository.save(category); // Salvando o item na tabela de fato
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find(); // Utilizando o método find() do repository para buscar todos as categories salvaas no banco
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name });

    return category;
  }
}

export { CategoriesRepository };
