import express, { Application, Request, Response } from 'express';
import { connectDB } from '../database/connectdb';
import routes from '../routes';
import errorHandler from '../middlewares/errorHandler.middleware';
import morgan from 'morgan';
import checkIsDev from '../utils/checkIsDev';
import notFoundHandler from '../middlewares/notFound.middleware';
import { PORT } from '../config';

export default async () => {
  if (process.env.NODE_ENV !== 'test') {
    await connectDB();
  }
  const app: Application = express();
  const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
  if (checkIsDev()) {
    app.use(morgan('dev'));
  }
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/', async (req: Request, res: Response) => {
    res.status(200).json({
      message: 'CERO-ORCHESTRATOR',
    });
  });

  routes(app);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return server;
};
