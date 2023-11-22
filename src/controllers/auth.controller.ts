import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { CompanyUserModel } from '../models/company/CompanyUser.model';
import generateToken from '../utils/generateToken';
import CompanyModel from '../models/company/Company.model';

const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const companyUser = await CompanyUserModel.findOne({ email });

      if (companyUser && (await companyUser.isPasswordMatched(password))) {
        const company = await CompanyModel.findOne(companyUser?.company_id);
        const payload = {
          user_id: companyUser?._id,
          company_id: company?.id,
          role: "user" // user or admin
        }
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
        res.status(401);
        throw new Error('Invalid Login Credentials');
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);

export default { loginUser };
