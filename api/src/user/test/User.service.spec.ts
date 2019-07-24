import { createUser } from '../User.service';
import bcrypt from 'bcryptjs';

describe('UserService', () => {
  it('should call bcrypt with the password', async () => {
    jest.mock('bcryptjs');
    bcrypt.hash = jest.fn();
    const user = {
      name: 'name',
      username: 'username',
      password: 'pass123',
      email: 'email@email.com',
    };

    createUser(user, jest.fn(() => user) as any);

    expect(bcrypt.hash).toHaveBeenCalledTimes(1);
    expect(bcrypt.hash).toHaveBeenCalledWith(user.password, 12);
  });
});
