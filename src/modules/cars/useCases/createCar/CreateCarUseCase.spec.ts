import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMenory: CarsRepositoryInMemory;

describe('CreateCar', () => {
  beforeEach(() => {
    carsRepositoryInMenory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMenory);
  });
  test('should be able to create a new car', async () => {
    await createCarUseCase.execute({
      name: 'NameCar',
      description: 'DescriptionCar',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });
  });
});
