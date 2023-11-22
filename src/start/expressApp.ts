import express, { Application } from 'express';
import connectDB from '../database/connectdb';
import authRoutes from '../routes/auth/auth.routes';
import routes from '../routes';

export default async (app: Application) : Promise<void> => {

    await connectDB();
  
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    app.get('/', async (req, res) => {
      res.status(200).json({
         message: 'CERO-ORCHESTRATOR'
      });
    });
    routes(app);
  }
  