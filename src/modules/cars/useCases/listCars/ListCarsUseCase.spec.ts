import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListCarsUseCase } from './ListCarsUseCase';

let listCarsUseCase: ListCarsUseCase;
let carsRepository: ICarsRepository;

describe('ListCarUseCase', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepository);
  });

  test('should be able to list all available cars', async () => {
    carsRepository.create({
      name: 'Prius',
      description: 'Carro de amante da natureza!',
      daily_rate: 150,
      license_plate: 'ACS-1234',
      fine_amount: 100,
      brand: 'Toyota',
      category_id: 'edab3244-dc5e-4b72-b39b-057f2fa87932',
    });

    const allCars = await listCarsUseCase.execute({});

    expect(allCars).toHaveLength(1);
  });

  test('should be able to list all cars by name', async () => {
    const car = await carsRepository.create({
      name: 'Prius',
      description: 'Carro de amante da natureza!',
      daily_rate: 150,
      license_plate: 'ACS-1234',
      fine_amount: 100,
      brand: 'Toyota teste',
      category_id: 'edab3244-dc5e-4b72-b39b-057f2fa87932',
    });

    const allCars = await listCarsUseCase.execute({
      brand: 'Toyota teste',
    });

    expect(allCars).toEqual([car]);
  });
});
