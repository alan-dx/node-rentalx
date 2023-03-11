import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalRepository';
import { AppError } from '@shared/errors/AppError';

dayjs.extend(utc);

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({
    car_id,
    expected_return_date,
    user_id,
  }: IRequest): Promise<Rental> {
    const minimumHourDiff = 24;

    const carHasOpenRental = await this.rentalsRepository.findOpenRentalByCarId(
      car_id,
    );

    if (carHasOpenRental) throw new AppError('Car is unavailable');

    const userHasOpenRental = await this.rentalsRepository.findOpenRentalByUserId(
      user_id,
    );

    if (userHasOpenRental)
      throw new AppError('There is a rental in progress for user!');

    const expectedReturnDateFormat = dayjs(expected_return_date)
      .utc()
      .local()
      .format();

    const dateNow = dayjs().utc().local().format();
    const compare = dayjs(expectedReturnDateFormat).diff(dateNow, 'hours');

    if (compare < minimumHourDiff) {
      throw new AppError('Invalid return time!');
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
