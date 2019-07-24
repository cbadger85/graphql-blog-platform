import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import { User } from './User.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createAndSave({
    name,
    email,
    password,
    username,
  }: User): Promise<User> {
    const user = new User();
    user.email = email;
    user.name = name;
    user.password = password;
    user.username = username;
    return await this.save(user);
  }

  async findByField(
    field: string,
    fieldValue: string
  ): Promise<User | undefined> {
    return await this.findOne({ where: { [field]: fieldValue } });
  }
}
