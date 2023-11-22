import express, { Application } from 'express';
import connectDB from '../database/connectdb';
import routes from '../routes';
import errorHandler from '../middlewares/errorHandler.middleware'
import morgan from 'morgan'
import checkIsDev from '../utils/checkIsDev'

export default async (app: Application) : Promise<void> => {

    await connectDB();
    if(checkIsDev()) {
      app.use(morgan('dev'))
    }
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    app.get('/', async (req, res) => {
      res.status(200).json({
         message: 'CERO-ORCHESTRATOR'
      });
    });
    routes(app);
    app.use(errorHandler)
  }
  