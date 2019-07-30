import 'reflect-metadata';
import { UserResolver } from '../User.resolver';

const input = {
  username: 'username',
  email: 'email@email.com',
  password: 'password',
  name: 'name',
};

const createdUser = {
  username: 'username',
  email: 'email@email.com',
  password: 'hashedPassword',
  name: 'name',
  id: '1',
};

const userProvider = {
  createUser: jest.fn(() => createdUser),
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
      { input },
      context as any
    );
    expect(userProvider.createUser).toBeCalledWith(input);
    expect(newUser).toBe(createdUser);
  });
});
