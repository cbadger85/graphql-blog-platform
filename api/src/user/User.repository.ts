import { EntityRepository, Repository } from 'typeorm';
import { User } from './User.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser({ name, email, password, username }: User): Promise<User> {
    const user = new User();
    user.email = email;
    user.name = name;
    user.password = password;
    user.username = username;
    return await this.save(user);
  }

  async findUserByField(
    field: string,
    fieldValue: string
  ): Promise<User | undefined> {
    return await this.findOne({ where: { [field]: fieldValue } });
  }
}
