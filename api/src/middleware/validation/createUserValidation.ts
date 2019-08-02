import Joi, { JoiObject } from '@hapi/joi';
import { Role } from '../../user/types/Role';

export const createUserValidationSchema = Joi.object().keys({
  name: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  role: Joi.array().items(
    Joi.string().valid(Role.ADMIN, Role.EDITOR, Role.WRITER)
  ),
});
