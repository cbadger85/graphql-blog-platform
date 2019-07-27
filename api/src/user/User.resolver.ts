import { ContextType } from '../types/ContextType';
import { User } from './User.Entity';
import { UserProvider } from './User.provider';

export const UserResolver = {
  Mutation: {
    register: (
      root: undefined,
      { input }: { input: User },
      { injector }: ContextType
    ) => {
      return injector.get(UserProvider).createUser({
        name: input.name,
        username: input.username,
        password: input.password,
        email: input.email,
      });
    },
    hello: (root: undefined, { name }: { name: string }) => name,
  },
};
