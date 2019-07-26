import 'reflect-metadata';
import { UserProvider } from '../User.provider';
import bcrypt from 'bcryptjs';

describe('UserProvider', () => {
  const repositoryMock = {
    createUser: () => null,
  };

  const userProvider = new UserProvider(jest.fn(() => repositoryMock as any));

  it('should call bcrypt with the password', async () => {
    bcrypt.hash = await jest.fn();
    jest.mock('bcryptjs');
    const user = {
      name: 'name',
      username: 'username',
      password: 'pass123',
      email: 'email@email.com',
    };

    await userProvider.createUser(user);

    expect(bcrypt.hash).toHaveBeenCalled();
    expect(bcrypt.hash).toHaveBeenCalledWith(user.password, 12);
  });

  it('should call createUser with the hashed password', async () => {
    jest.mock('bcryptjs');
    bcrypt.hash = await jest.fn(() => 'hashedPassword' as any);

    repositoryMock.createUser = jest.fn();

    const user = {
      name: 'name',
      username: 'username',
      password: 'pass123',
      email: 'email@email.com',
    };

    const expectedUser = {
      ...user,
      password: 'hashedPassword',
    };

    await userProvider.createUser(user);

    expect(repositoryMock.createUser).toHaveBeenCalledWith(expectedUser);
    expect(repositoryMock.createUser).toHaveBeenCalled();
  });
});
