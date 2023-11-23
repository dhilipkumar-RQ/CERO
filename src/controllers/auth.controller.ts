import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import { CompanyUserModel } from '../models/company/CompanyUser.model';
import generateToken from '../utils/generateToken';
import CompanyModel from '../models/company/Company.model';
import APIErrorResponse from '../errors';
import mongoose from 'mongoose';

const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const companyUser = await CompanyUserModel.findOne({ email });

      if (companyUser && (await companyUser.isPasswordMatched(password))) {
        const company = await CompanyModel.findOne(companyUser?.company_id);

        const payload = {
          user_email: companyUser.email,
          user_id: companyUser?._id,
          company_id: company?.id,
          role: 'user', // user or admin
        };

        res.json({
          user: {
            user_id: companyUser?._id,
            first_name: companyUser?.first_name,
            last_name: companyUser?.last_name,
            email: companyUser?.email,
            company_id: companyUser?.company_id,
            terms_and_condition: company?.is_tc_agreed,
          },
          token: {
            token: generateToken(payload),
          },
        });
      } else {
        throw new APIErrorResponse.UnauthenticatedError('Invalid Credentials');
      }
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  },
);


const setPassword= asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { new_password } = req.body.user;
      const { user_id } = req.user
      const companyUser = await CompanyUserModel.findOne({ _id: new mongoose.Types.ObjectId(user_id) });
      companyUser.password = new_password
      await companyUser.save()
    } catch (error) {
      next(error)
    }
  }
)

export default { loginUser };
