import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './customAPI';

class NotFoundError extends CustomAPIError {
  public statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND; //404
  }
}

export default NotFoundError;
