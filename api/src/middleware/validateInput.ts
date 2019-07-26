import { User } from 'src/user/User.entity';
import { ContextType } from 'src/types/ContextType';
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
