import { ContextType } from 'src/types/ContextType';
import { User } from '../User.entity';
import { validationSchema } from '../../validation/validaton';

export const testMiddleware = () => (next: Function) => async (
  _root: undefined,
  _args: undefined,
  context: ContextType,
  _info: undefined
) => {
  console.log('!!!!! this is an example of middleware !!!!!');

  return next(_root, _args, context, _info);
};

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
