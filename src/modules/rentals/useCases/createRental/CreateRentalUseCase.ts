import { IRentalsRepository } from '@modules/rentals/repositories/IRentalRepository';
import { AppError } from '@shared/errors/AppError';

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
  }: IRequest): Promise<void> {
    const carHasOpenRental = await this.rentalsRepository.findOpenRentalByCarId(
      car_id,
    );

    if (carHasOpenRental) throw new AppError('Car is unavailable');

    const userHasOpenRental = await this.rentalsRepository.findOpenRentalByUserId(
      user_id,
    );

    if (userHasOpenRental)
      throw new AppError('There is a rental in progress for user!');
  }
}

export { CreateRentalUseCase };
