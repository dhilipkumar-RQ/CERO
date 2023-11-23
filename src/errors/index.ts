import CustomAPIError from './customAPI';
import UnauthenticatedError from './unauthenticated';
import NotFoundError from './notFound';
import BadRequestError from './badRequest';
import UnauthorizedError from './unauthorized';

export default {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
};

/* Example usage - 
import APIErrorResponse from ./errors
throw new APIErrorResponse.UnauthenticatedError('Invalid Credentials')
*/
