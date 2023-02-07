import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('CreateCar', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  test('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'NameCar',
      description: 'DescriptionCar',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  test('should not be able to create a car with an license plate that already exists', async () => {
    await createCarUseCase.execute({
      name: 'Car 1',
      description: 'DescriptionCar',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    const promise = createCarUseCase.execute({
      name: 'Car 2',
      description: 'DescriptionCar',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    expect(promise).rejects.toBeInstanceOf(AppError);
  });

  test('should be able to create a car with available equals to true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Available',
      description: 'DescriptionCar',
      daily_rate: 100,
      license_plate: 'ABA-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    expect(car.available).toBe(true);
  });
});
