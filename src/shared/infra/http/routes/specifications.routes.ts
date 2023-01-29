import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';

import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthentication);
specificationsRoutes.post('/', createSpecificationController.handle);

export { specificationsRoutes };
