import express, { Router } from 'express';
import { authController } from '../controllers';
import Validate from '../middlewares/requestValidator.middleware';
import { authRouteValidator } from '../validators';
import {authMiddleware} from '../middlewares/auth.middleware';
const authRoutes: Router = express.Router();

authRoutes.post(
  '/login',
  Validate(authRouteValidator.LOGIN_REQUEST_SCHEMA),
  authController.loginUser,
);

authRoutes.put(
    '/set-password',
    authMiddleware,
    Validate(authRouteValidator.PUT_SET_PASSWORD_SCHEMA),
    authController.setPassword,
)

export default authRoutes;
