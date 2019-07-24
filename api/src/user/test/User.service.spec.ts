import { UserService } from '../User.service';
import bcrypt from 'bcryptjs';

let userService: UserService;

beforeAll(() => {
  userService = new UserService(jest.fn() as any);
});

describe('UserService', () => {
  it('should call bcrypt with the password', async () => {
    jest.mock('bcryptjs');
    bcrypt.hash = await jest.fn();
    const user = {
      name: 'name',
      username: 'username',
      password: 'pass123',
      email: 'email@email.com',
    };

    userService.createUser(user);

    expect(bcrypt.hash).toHaveBeenCalledTimes(1);
    expect(bcrypt.hash).toHaveBeenCalledWith(user.password, 12);
  });
});
