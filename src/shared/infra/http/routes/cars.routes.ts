import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { UploadCarImageController } from '@modules/cars/useCases/uploadCarImage/uploadCarImageController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImageController();

// const uploadCarImage = multer({
//       storage: multer.diskStorage({
//         destination: resolve(__dirname, '..', '..', './tmp/cars'),
//         filename: (request, file, callback) => {
//           const fileHash = crypto.randomBytes(16).toString('hex');
//           const fileName = `${fileHash}-${file.originalname}`;

//           return callback(null, fileName);
//         },
//       }),
//     });
const uploadCarImage = multer(uploadConfig);

carsRoutes.post(
  '/',
  ensureAuthentication,
  ensureAdmin,
  createCarController.handle,
);

carsRoutes.get('/available', listAvailableCarsController.handle);
carsRoutes.post(
  '/specifications/:id',
  ensureAuthentication,
  ensureAdmin,
  createCarSpecificationController.handle,
);
carsRoutes.post(
  '/images/:id',
  ensureAuthentication,
  ensureAdmin,
  uploadCarImage.array('images'),
  uploadCarImagesController.handle,
);

export { carsRoutes };
