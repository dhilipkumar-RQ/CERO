import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './customAPI';

class UnauthenticatedError extends CustomAPIError {
  public statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED; //401
  }
}

export default UnauthenticatedError;
