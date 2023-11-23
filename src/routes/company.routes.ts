import express, { Router } from 'express';
import { companyController } from '../controllers';

import Validate from '../middlewares/requestValidator.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';
import { companyRouteValidator } from '../validators';

const companyRoutes: Router = express.Router();

companyRoutes.put(
  '/:id/terms-and-condition',
  authMiddleware,
  Validate(companyRouteValidator.UPDATE_TERMS_AND_CONDITION_REQUEST_SCHEMA),
  companyController.acceptTermsAndCondition,
);

export default companyRoutes;
