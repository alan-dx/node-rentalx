import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';

import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalRoutes.post('/', ensureAuthentication, createRentalController.handle);
rentalRoutes.post(
  '/devolution/:id',
  ensureAuthentication,
  devolutionRentalController.handle,
);

export { rentalRoutes };
