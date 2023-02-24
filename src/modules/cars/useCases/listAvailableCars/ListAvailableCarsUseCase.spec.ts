import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepository: ICarsRepository;

describe('ListAvailableCarUseCase', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
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

    const allCars = await listAvailableCarsUseCase.execute({});

    expect(allCars).toHaveLength(1);
  });

  test('should be able to list all cars by brand', async () => {
    const car = await carsRepository.create({
      name: 'Prius',
      description: 'Carro de amante da natureza!',
      daily_rate: 150,
      license_plate: 'ACS-1234',
      fine_amount: 100,
      brand: 'Toyota teste',
      category_id: 'edab3244-dc5e-4b72-b39b-057f2fa87932',
    });

    const allCars = await listAvailableCarsUseCase.execute({
      brand: 'Toyota teste',
    });

    expect(allCars).toEqual([car]);
  });

  test('should be able to list all cars by name', async () => {
    const car = await carsRepository.create({
      name: 'Car3',
      description: 'Lorem Ipsum!',
      daily_rate: 150,
      license_plate: 'ACS-1234',
      fine_amount: 100,
      brand: 'Toyota teste',
      category_id: 'edab3244-dc5e-4b72-b39b-057f2fa87932',
    });

    const allCars = await listAvailableCarsUseCase.execute({
      name: 'Car3',
    });

    expect(allCars).toEqual([car]);
  });

  test('should be able to list all cars by category id', async () => {
    const car = await carsRepository.create({
      name: 'Car4',
      description: 'Lorem Ipsum!',
      daily_rate: 150,
      license_plate: 'ACS-1234',
      fine_amount: 100,
      brand: 'Toyota teste',
      category_id: '12345',
    });

    const allCars = await listAvailableCarsUseCase.execute({
      category_id: '12345',
    });

    expect(allCars).toEqual([car]);
  });
});
