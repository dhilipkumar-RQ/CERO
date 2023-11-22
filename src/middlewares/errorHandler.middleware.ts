import { NextFunction, Response, Request } from 'express';
import checkIsDev from '../utils/checkIsDev';
export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const isDev = checkIsDev();

  let errorMessage = err.message
  console.log("Error is ", err.message)

  res.status(500).json({
    status: 'error',
    error: {
      message: errorMessage,
      details: isDev ? err.stack : '',
    },
  });
};
