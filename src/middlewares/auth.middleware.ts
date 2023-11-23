import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config';
import APIErrorResponse from '../errors';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers['authorization'];
    if (!token) {
      throw new APIErrorResponse.UnauthenticatedError('UnAuthroized user');
    }
    const decoded: any = jwt.verify(token, JWT_SECRET_KEY as string);

    if (!decoded) {
      throw new APIErrorResponse.UnauthenticatedError('UnAuthroized user');
    }

    req.user = decoded;
  } catch (err) {
    next(err);
  }
  return next();
};
