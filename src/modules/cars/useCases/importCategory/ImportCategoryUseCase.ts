import csvParse from 'csv-parse';
import fs from 'fs';

class ImportCategoryUseCase {
  execute(file: Express.Multer.File): void {
    const stream = fs.createReadStream(file.path); // Leitura do csv em chunks(pedaços)

    const parseFile = csvParse.parse(); // Instancia do csvParse que fara a leitura do csv chunk

    stream.pipe(parseFile); // Cria uma especie de pipeline que utilizara o csvParse para ler cada pedaco do arquivo

    parseFile.on('data', async line => {
      // Cria um callback que executa toda vez que a leitura do chunk do csv for finalizada
      console.log(line);
    });
  }
}

export { ImportCategoryUseCase };
