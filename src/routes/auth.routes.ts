import express, { Router } from 'express';
import {authController} from '../controllers';
const authRoutes: Router = express.Router();

authRoutes.post('/login', authController.loginUser);

export default authRoutes;
