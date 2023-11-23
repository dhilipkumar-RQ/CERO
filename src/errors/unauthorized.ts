import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './customAPI';

class UnauthorizedError extends CustomAPIError {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN; // 403
  }
}

export default UnauthorizedError;
