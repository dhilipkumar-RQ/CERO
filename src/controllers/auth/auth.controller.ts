import e, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { CompanyUserModel } from '../../models/company/User.model';

const loginUser = asyncHandler(async (req: Request, res: Response, next) => {
  
});

export  {loginUser};
