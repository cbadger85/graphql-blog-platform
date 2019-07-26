import { Inject, Injectable } from '@graphql-modules/di';
import bcrypt from 'bcryptjs';
import { User } from './User.Entity';
import { UserRepository } from './User.repository';

@Injectable()
export class UserProvider {
  private repository: UserRepository;
  constructor(
    @Inject('UserRepo') private userRepository: () => UserRepository
  ) {
    this.repository = userRepository();
  }

  async createUser({ name, email, password, username }: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    return await this.repository.createUser({
      email,
      name,
      username,
      password: hashedPassword,
    });
  }
}
