import { ContextType } from '../types/ContextType';
import { User } from '../user/User.entity';
import { validationSchema } from './validation/validaton';

export const validateInput = () => (next: Function) => async (
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
