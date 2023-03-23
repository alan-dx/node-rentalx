import { Repository, getRepository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalRepository';

import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: { car_id, end_date: null },
    });

    return rental;
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: { user_id, end_date: null },
    });

    return rental;
  }

  async create({
    car_id,
    expected_return_date,
    user_id,
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
      id,
      end_date,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id);

    return rental;
  }

  async findByUserId(user_id: string): Promise<Rental[]> {
    const rentals = this.repository.find({
      where: { user_id }, // Condição => "Busque, na tabela de rentals, o item que possui o user_id igual ao informado"
      relations: ['car'], // Informa qual relacionamento deve ser buscado, vai fazer um join na tabela de carros, conforme configurado no Model Rental
    });

    return rentals;
  }
}

export { RentalsRepository };
