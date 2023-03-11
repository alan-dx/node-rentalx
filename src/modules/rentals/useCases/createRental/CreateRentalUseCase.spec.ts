import dayjs from 'dayjs';

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('CreateRentalUseCase', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
    );
  });

  test('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '123123',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
  });

  test('should not be able to create a new rental if there is another open to the same user', async () => {
    await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '123123',
      expected_return_date: dayAdd24Hours,
    });

    const promise = createRentalUseCase.execute({
      user_id: '12345',
      car_id: '12313',
      expected_return_date: dayAdd24Hours,
    });

    expect(promise).rejects.toBeInstanceOf(AppError);
  });

  test('should not be able to create a new rental with invalid return time', async () => {
    const promise = createRentalUseCase.execute({
      user_id: '12345',
      car_id: '123123',
      expected_return_date: dayjs().toDate(),
    });

    expect(promise).rejects.toBeInstanceOf(AppError);
  });
});
