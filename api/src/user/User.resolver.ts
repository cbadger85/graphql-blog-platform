import { ModuleContext } from '@graphql-modules/core';
import { UserProvider } from './User.provider';
import { User } from './User.Entity';

export const UserResolver = {
  Mutation: {
    register: (
      root: undefined,
      { input }: { input: User },
      { injector }: ModuleContext
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
