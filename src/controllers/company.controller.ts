import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

const acceptTermsAndCondition = asyncHandler(
  async (req: Request, res: Response, next) => {
    res.send('acceptTermsAndCondition');
  },
);

export default { acceptTermsAndCondition };
