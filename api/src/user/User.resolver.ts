import { ContextType } from '../types/ContextType';
import { ICreateUser } from './types/ICreateUser';
import { IUserLogin } from './types/IUserLogin';
import { UserProvider } from './User.provider';
import { User } from './User.entity';

export const UserResolver = {
  Mutation: {
    createUser: (
      root: undefined,
      { input }: { input: ICreateUser },
      { injector }: ContextType
    ): Promise<User> => {
      return injector.get(UserProvider).createUser(input);
    },
    login: (
      root: undefined,
      { input }: { input: IUserLogin },
      { injector }: ContextType
    ): Promise<User> => {
      return injector.get(UserProvider).login(input);
    },
    logout: (
      root: undefined,
      args: undefined,
      { injector }: ContextType
    ): void => {
      injector.get(UserProvider).logout();
    },
    hello: (root: undefined, { name }: { name: string }) => name,
  },
};
