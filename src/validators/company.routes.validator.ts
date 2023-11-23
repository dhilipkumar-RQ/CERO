import Joi, { ObjectSchema } from 'joi';

interface CompanyTCUpdateRequest {
  body: {
    data: {
      status: boolean;
    };
  };
}

const UPDATE_TERMS_AND_CONDITION_REQUEST_SCHEMA: ObjectSchema<CompanyTCUpdateRequest> =
  Joi.object({
    body: Joi.object({
      data: Joi.object({
        status: Joi.boolean().required(),
      }).required(),
    }),
    params: Joi.object({}),
    query: Joi.object({}),
  });

export default { UPDATE_TERMS_AND_CONDITION_REQUEST_SCHEMA };
