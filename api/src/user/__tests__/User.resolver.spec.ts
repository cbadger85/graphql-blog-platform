import 'reflect-metadata';
import { UserResolver } from '../User.resolver';

const createUserInput = {
  username: 'username',
  email: 'email@email.com',
  password: 'password',
  name: 'name',
};

const loginInput = {
  username: 'username',
  password: 'password',
};

const user = {
  username: 'username',
  email: 'email@email.com',
  password: 'hashedPassword',
  name: 'name',
  id: 1,
};

const userProvider = {
  createUser: jest.fn(() => user),
  login: jest.fn(() => user),
};

const context = {
  injector: {
    get: jest.fn(() => userProvider),
  },
};

describe('UserResolver', () => {
  it('should call createUser', async () => {
    const newUser = UserResolver.Mutation.createUser(
      undefined,
      { input: createUserInput },
      context as any
    );
    expect(userProvider.createUser).toBeCalledWith(createUserInput);
    expect(newUser).toBe(user);
  });

  it('should call login', async () => {
    const foundUser = UserResolver.Mutation.login(
      undefined,
      { input: loginInput },
      context as any
    );

    expect(userProvider.login).toHaveBeenCalledWith(loginInput);
    expect(foundUser).toBe(user);
  });
});
