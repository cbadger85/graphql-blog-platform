import Joi from '@hapi/joi';

export const validationSchema = Joi.object().keys({
  name: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
});
