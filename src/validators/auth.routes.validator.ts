import Joi, { ObjectSchema } from 'joi';

interface CompanyUserLoginRequest {
  body: {
    email: string;
    password: string;
  };
}

const LOGIN_REQUEST_SCHEMA: ObjectSchema<CompanyUserLoginRequest> = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).required(),
  params: Joi.object({}),
  query: Joi.object({}),
});

export default { LOGIN_REQUEST_SCHEMA };
