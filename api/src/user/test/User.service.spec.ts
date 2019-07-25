import { UserService } from '../User.service';
import bcrypt from 'bcryptjs';

describe('UserService', () => {
  const repositoryMock = {
    createAndSave: jest.fn(),
  };

  const userService = new UserService(repositoryMock as any);

  it('should call bcrypt with the password', async () => {
    jest.mock('bcryptjs');
    bcrypt.hash = await jest.fn();
    const user = {
      name: 'name',
      username: 'username',
      password: 'pass123',
      email: 'email@email.com',
    };

    await userService.createUser(user);

    expect(bcrypt.hash).toHaveBeenCalledTimes(1);
    expect(bcrypt.hash).toHaveBeenCalledWith(user.password, 12);
  });
});
