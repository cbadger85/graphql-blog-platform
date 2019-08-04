import { ModuleSessionInfo } from '@graphql-modules/core';
import { Inject, Injectable, ProviderScope } from '@graphql-modules/di';
import { AuthenticationError } from 'apollo-server-express';
import { CookieOptions, Response } from 'express';
import bcrypt from 'bcryptjs';
import { ICreateUser } from './types/ICreateUser';
import { IUserLogin } from './types/IUserLogin';
import { User } from './User.Entity';
import { UserRepository } from './User.repository';
import { createTokens } from '../utils/createTokens';

@Injectable({ scope: ProviderScope.Session })
export class UserProvider {
  private repository: UserRepository;
  constructor(
    @Inject('UserRepo') private userRepository: () => UserRepository,
    @Inject(ModuleSessionInfo) private moduleSession: ModuleSessionInfo
  ) {
    this.repository = userRepository();
  }

  get session() {
    return this.moduleSession.session;
  }

  get res() {
    return this.moduleSession.session.res as Response;
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

    const { accessToken, refreshToken } = createTokens(user);

    this.res.cookie('access-token', accessToken, {
      expires: new Date(Date.now() + 60000 * 10),
      httpOnly: true,
    });
    this.res.cookie('refresh-token', refreshToken, {
      expires: new Date(Date.now() + 60000 * 60 * 24),
      httpOnly: true,
    });

    return user;
  }

  logout(): void {
    this.res.clearCookie('access-token');
    this.res.clearCookie('refresh-token');
  }
}
