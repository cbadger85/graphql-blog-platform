import { ContextType } from '../types/ContextType';
import { User } from '../user/User.entity';
import { UserRepository } from '../user/User.repository';
import { ValidationError } from 'apollo-server-express';

export const isUserUnique = () => (next: Function) => async (
  _root: any,
  { input }: { input: User },
  context: ContextType,
  _info: any
) => {
  const getRepo: () => UserRepository = context.injector.get('UserRepo');
  const userRepository = getRepo();

  const email = await userRepository.findUserByField('email', input.email);
  const username = await userRepository.findUserByField(
    'username',
    input.username
  );

  const errors: UserNotUniqueError[] = [];

  if (username) {
    errors.push(UserNotUniqueError.USERNAME_NOT_UNIQUE);
  }

  if (email) {
    errors.push(UserNotUniqueError.EMAIL_NOT_UNIQUE);
  }

  if (errors.length) {
    const validationError = new ValidationError(errors.join(', '));
    validationError.extensions.errors = errors;

    // throw validationError;
    throw new Error();
  }

  return next(_root, { input }, context, _info);
};

enum UserNotUniqueError {
  EMAIL_NOT_UNIQUE = 'EMAIL_NOT_UNIQUE',
  USERNAME_NOT_UNIQUE = 'USERNAME_NOT_UNIQUE',
  USERNAME_AND_EMAIL_NOT_UNIQUE = 'USERNAME_AND_EMAIL_NOT_UNIQUE',
}
