import { Request, Response } from 'express';
import mongoose, { Schema } from 'mongoose';
import asyncHandler from 'express-async-handler';
import CompanyModel from '../models/company/Company.model';

const acceptTermsAndCondition = asyncHandler(
  async (req: Request, res: Response, next) => {
    try {
      const { status } = req.body.data;
      const { company_id, user_id } = req.user;
      const company = await CompanyModel.findOne({ _id: company_id });
      if (status) {
        company.is_tc_agreed = true;
        company.tc_agreed_by_id = new mongoose.Types.ObjectId(String(user_id));
        await company.save();
      }
      res.json({ message: 'terms and condition updated successfully' });
    } catch (error) {
      next(error);
    }
  },
);

export default { acceptTermsAndCondition };
