import 'reflect-metadata';
import '@shared/container';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import { AppError } from '@shared/errors/AppError';
import createConnection from '@shared/infra/typeorm';

import { router } from './routes';

createConnection();
const app = express();

app.use(express.json());

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

app.listen(3333, () => console.log('Server started'));
