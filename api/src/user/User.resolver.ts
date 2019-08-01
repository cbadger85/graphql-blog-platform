import { ContextType } from '../types/ContextType';
import { ICreateUser } from './types/ICreateUser';
import { IUserLogin } from './types/IUserLogin';
import { UserProvider } from './User.provider';

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
