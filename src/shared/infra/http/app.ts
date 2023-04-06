import uploadConfig from '@config/upload';
import 'reflect-metadata';
import '@shared/container';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import { AppError } from '@shared/errors/AppError';
import createConnection from '@shared/infra/typeorm';

import { router } from './routes';

createConnection();
const app = express();

app.use(express.json());

app.use('/avatar', express.static(`${uploadConfig.tmpFolder}/avatar`));
app.use('/cars', express.static(`${uploadConfig.tmpFolder}/cars`));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }
    next(err);

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  },
);

export { app };
