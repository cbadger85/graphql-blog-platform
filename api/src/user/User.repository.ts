import { EntityRepository, Repository } from 'typeorm';
import { ICreateUser } from './types/ICreateUser';
import { User } from './User.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(user: ICreateUser): Promise<User> {
    return await this.save(user);
  }

  async findUserByField(
    field: string,
    fieldValue: string
  ): Promise<User | undefined> {
    return await this.findOne({ where: { [field]: fieldValue } });
  }
}
