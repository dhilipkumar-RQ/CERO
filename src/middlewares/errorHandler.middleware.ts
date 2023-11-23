import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import checkIsDev from '../utils/checkIsDev';

interface CustomError {
  statusCode: number;
  msg: string;
}

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  const isDev = checkIsDev();

  let customError: CustomError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  };

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item: any) => item.message)
      .join(',');
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue,
    )} field, please choose another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.name === 'CastError') {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  return res.status(customError.statusCode).json({
    message: customError.msg,
    details: isDev ? err.stack : '',
  });
};
