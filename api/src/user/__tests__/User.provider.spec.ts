import 'reflect-metadata';
import { UserProvider } from '../User.provider';
import bcrypt from 'bcryptjs';
import { AuthenticationError } from 'apollo-server-core';

jest.mock('bcryptjs');

const repositoryMock = {
  createUser: jest.fn(),
  findUserByField: jest.fn(),
};

const userProvider = new UserProvider(jest.fn(() => repositoryMock as any));

describe('UserProvider - createUser', () => {
  it('should call bcrypt with the password', async () => {
    bcrypt.hash = await jest.fn();
    const user = {
      name: 'name',
      username: 'username',
      password: 'pass123',
      email: 'email@email.com',
    };

    await userProvider.createUser(user);

    expect(bcrypt.hash).toHaveBeenCalledWith(user.password, 12);
  });

  it('should return a user with the hashed password', async () => {
    const hashedPassword = 'hashedPassword';

    bcrypt.hash = await jest.fn(() => hashedPassword as any);

    const user = {
      name: 'name',
      username: 'username',
      password: 'pass123',
      email: 'email@email.com',
    };

    const generatedId = 1;

    const savedUser = {
      ...user,
      password: hashedPassword,
      id: generatedId,
    };

    repositoryMock.createUser = jest.fn(() => savedUser);

    const expectedSavedUser = await userProvider.createUser(user);

    expect(repositoryMock.createUser).toHaveBeenCalledWith({
      ...user,
      password: hashedPassword,
    });

    expect(expectedSavedUser).toBe(savedUser);
  });
});

describe('UserProvider - login', () => {
  const loginInput = {
    username: 'username',
    password: 'hashedPassword',
  };

  const user = {
    username: 'username',
    password: 'password',
    name: 'name',
    email: 'email',
  };

  it('should call findUserByField', async () => {
    repositoryMock.findUserByField = jest.fn(() => user);
    bcrypt.compare = jest.fn(() => true) as any;

    await userProvider.login(loginInput);

    expect(repositoryMock.findUserByField).toHaveBeenCalledWith(
      'username',
      loginInput.username
    );
  });

  it('should throw an error if the user is invalid', async () => {
    repositoryMock.findUserByField = jest.fn(() => undefined);

    const error = await userProvider.login(loginInput).catch(err => err);

    expect(error).toBeInstanceOf(AuthenticationError);
  });

  it('should call bcrypt to compare the hashed password', async () => {
    repositoryMock.findUserByField = jest.fn(() => user);
    bcrypt.compare = jest.fn(() => true) as any;

    await userProvider.login(loginInput);

    expect(bcrypt.compare).toHaveBeenCalledWith(
      loginInput.password,
      user.password
    );
  });

  it('should throw an error if the password is incorrect', async () => {
    repositoryMock.findUserByField = jest.fn(() => user);
    bcrypt.compare = jest.fn(() => false) as any;

    const error = await userProvider.login(loginInput).catch(err => err);

    expect(error).toBeInstanceOf(AuthenticationError);
  });

  it('should return a user', async () => {
    repositoryMock.findUserByField = jest.fn(() => user);
    bcrypt.compare = jest.fn(() => true) as any;

    const foundUser = await userProvider.login(loginInput);

    expect(foundUser).toEqual(user);
  });
});
