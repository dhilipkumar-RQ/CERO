import Joi from 'joi'

const PUT_ID_ACCEPT_TERMS_AND_CONDITION_SCHEMA = Joi.object({
    body: Joi.object({
        data: Joi.object({
            status: Joi.boolean().required(),
        }).required(),
    }),
    params: Joi.object({}),
    query: Joi.object({}),
});

export default {PUT_ID_ACCEPT_TERMS_AND_CONDITION_SCHEMA}