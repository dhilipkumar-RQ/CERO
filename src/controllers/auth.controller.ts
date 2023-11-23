import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import { CompanyUserModel } from '../models/company/CompanyUser.model';
import generateToken from '../utils/generateToken';
import CompanyModel from '../models/company/Company.model';
import APIErrorResponse from '../errors';
import mongoose from 'mongoose';
import { DEFAULT_COMPANY_USER_PASSWORD } from '../config';
import Joi from 'joi';

const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body.login;

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
      throw new APIErrorResponse.UnauthenticatedError(
        'Incorrect Email or Password',
      );
    }
  },
);

const setPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { new_password } = req.body.user;

    const passwordSchema = Joi.string()
      .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:<>?~-]).{8,}$/)
      .required();

    const validationResult = passwordSchema.validate(new_password);
    if (validationResult.error) {
      res.status(422).send({
        message:
          'Password must be a combination of minimum 8 characters, including 1 special character and 1 uppercase letter.',
      });
      return;
    }
    const { user_id } = req.user;
    const companyUser = await CompanyUserModel.findOne({
      _id: new mongoose.Types.ObjectId(user_id),
    });
    if (
      companyUser.password == null ||
      (await companyUser.isPasswordMatched(DEFAULT_COMPANY_USER_PASSWORD))
    ) {
      companyUser.password = new_password;
      await companyUser.save();
      res.send({ message: 'new password has been successfully set' });
    } else {
      res.status(422).send({ message: 'password has already been set' });
    }
  },
);

export default { loginUser, setPassword };
