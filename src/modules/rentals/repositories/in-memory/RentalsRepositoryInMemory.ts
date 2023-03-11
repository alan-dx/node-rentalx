import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IRentalsRepository } from '../IRentalRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[];

  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    return this.rentals.find(
      rental => rental.car_id === car_id && rental.end_date === null,
    );
  }
  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    return this.rentals.find(
      rental => rental.user_id === user_id && rental.end_date === null,
    );
  }
}

export { RentalsRepositoryInMemory };
