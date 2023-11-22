import express, { Router } from 'express';
import {companyController} from '../controllers'

const companyRoutes: Router = express.Router();

companyRoutes.put('/:id/terms-and-condition', companyController.acceptTermsAndCondition)

export default companyRoutes;