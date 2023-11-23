import express, { Router } from 'express';
import { authController } from '../controllers';
import Validate from '../middlewares/requestValidator.middleware';
import { authRouteValidator } from '../validators';

const authRoutes: Router = express.Router();

authRoutes.post(
  '/login',
  Validate(authRouteValidator.LOGIN_REQUEST_SCHEMA),
  authController.loginUser,
);

export default authRoutes;
