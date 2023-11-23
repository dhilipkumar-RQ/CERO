import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './customAPI';

export class BadRequestError extends CustomAPIError {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST; //400
  }
}

export default BadRequestError;
