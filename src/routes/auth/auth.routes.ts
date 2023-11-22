import express, { Router } from 'express';
import { loginUser } from '../../controllers/auth/auth.controller';

const authRoutes: Router = express.Router();

authRoutes.post('/login', loginUser)

export default authRoutes;
