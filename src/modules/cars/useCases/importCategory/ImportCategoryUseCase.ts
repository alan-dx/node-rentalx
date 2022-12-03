import csvParse from 'csv-parse';
import fs from 'fs';

import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path); // Leitura do csv em chunks(pedaços)
      const categories: IImportCategory[] = [];

      const parseFile = csvParse.parse(); // Instancia do csvParse que fara a leitura do csv chunk

      stream.pipe(parseFile); // Cria uma especie de pipeline que utilizara o csvParse para ler cada pedaco do arquivo

      parseFile
        .on('data', async line => {
          // Cria um callback que executa toda vez que a leitura do chunk do csv for finalizada
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on('end', () => {
          resolve(categories);
        })
        .on('error', err => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    console.log(categories);
  }
}

export { ImportCategoryUseCase };
