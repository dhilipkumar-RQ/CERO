import express, { Router } from 'express';
import {companyController} from '../controllers'

import Validate from '../middlewares/requestValidator.middleware'
import {companyRouteValidator} from '../validators'



const companyRoutes: Router = express.Router();
companyRoutes.put('/:id/terms-and-condition',Validate(companyRouteValidator.PUT_ID_ACCEPT_TERMS_AND_CONDITION_SCHEMA), companyController.acceptTermsAndCondition)

export default companyRoutes;