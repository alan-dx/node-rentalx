import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);
    const minimumDaily = 1;

    if (!rental || rental.end_date) throw new AppError('Rental not existis');

    const currentDate = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(rental.start_date, currentDate);

    if (daily <= 0) {
      daily = minimumDaily;
    }

    const delay = this.dateProvider.compareInDays(
      currentDate,
      rental.expected_return_date,
    );

    let total = 0;
    if (delay > 0) {
      const calculateFine = delay * car.fine_amount;
      total = calculateFine;
    }

    total += daily * car.daily_rate;
    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
