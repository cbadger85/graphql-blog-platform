import { ContextType } from '../types/ContextType';
import { User } from './User.Entity';
import { UserProvider } from './User.provider';
import { IUserLogin } from './types/IUserLogin';
import { ICreateUser } from './types/ICreateUser';

export const UserResolver = {
  Mutation: {
    createUser: (
      root: undefined,
      { input }: { input: ICreateUser },
      { injector }: ContextType
    ) => {
      return injector.get(UserProvider).createUser(input);
    },
    login: (
      root: undefined,
      { input }: { input: IUserLogin },
      { injector }: ContextType
    ) => {
      return injector.get(UserProvider).login(input);
    },
    hello: (root: undefined, { name }: { name: string }) => name,
  },
};
