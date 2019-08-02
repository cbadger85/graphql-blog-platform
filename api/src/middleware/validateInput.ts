import { ContextType } from '../types/ContextType';
import { User } from '../user/User.entity';
import { ObjectSchema } from '@hapi/joi';

export const validateInput = (validationSchema: ObjectSchema) => (
  next: Function
) => async (
  _root: undefined,
  { input }: { input: User },
  context: ContextType,
  _info: undefined
) => {
  const result = validationSchema.validate(input, { abortEarly: false });

  if (result.error) {
    throw result.error;
  }

  return next(_root, { input }, context, _info);
};
