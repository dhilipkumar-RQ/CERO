import Joi, { ObjectSchema } from 'joi';

interface CompanyUserLoginRequest {
  body: {
    login: {
      email: string;
      password: string;
    };
  };
}

interface SetPasswordCompanyUserRequest {
  body: {
    user: {
      new_password: string;
    };
  };
}

const LOGIN_REQUEST_SCHEMA: ObjectSchema<CompanyUserLoginRequest> = Joi.object({
  body: Joi.object({
    login: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }).required(),
  }).required(),
  params: Joi.object({}),
  query: Joi.object({}),
});

const PUT_SET_PASSWORD_SCHEMA: ObjectSchema<SetPasswordCompanyUserRequest> =
  Joi.object({
    body: Joi.object({
      user: Joi.object({
        new_password: Joi.string().required(),
      }).required(),
    }).required(),
    params: Joi.object({}),
    query: Joi.object({}),
  });

export default { LOGIN_REQUEST_SCHEMA, PUT_SET_PASSWORD_SCHEMA };
