import { Inject, Injectable } from '@graphql-modules/di';
import bcrypt from 'bcryptjs';
import { User } from './User.Entity';
import { UserRepository } from './User.repository';
import { AuthenticationError } from 'apollo-server-express';
import { IUserLogin } from './types/IUserLogin';
import { ICreateUser } from './types/ICreateUser';

@Injectable()
export class UserProvider {
  private repository: UserRepository;
  constructor(
    @Inject('UserRepo') private userRepository: () => UserRepository
  ) {
    this.repository = userRepository();
  }

  async createUser({
    name,
    email,
    password,
    username,
    role,
  }: ICreateUser): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    return await this.repository.createUser({
      email,
      name,
      username,
      password: hashedPassword,
      role,
    });
  }

  async login({ username, password }: IUserLogin): Promise<User> {
    const user = await this.repository.findUserByField('username', username);

    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new AuthenticationError('Invalid credentials');
    }

    return user;
  }
}
