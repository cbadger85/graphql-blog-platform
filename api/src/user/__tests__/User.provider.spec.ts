import 'reflect-metadata';
import { UserProvider } from '../User.provider';
import bcrypt from 'bcryptjs';

describe('UserProvider', () => {
  const repositoryMock = {
    createUser: jest.fn(),
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

    expect(bcrypt.hash).toHaveBeenCalledWith(user.password, 12);
  });

  it('should return a user with the hashed password', async () => {
    jest.mock('bcryptjs');

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
