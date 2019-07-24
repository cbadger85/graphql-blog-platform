import { getCustomRepository } from 'typeorm';
import { User } from './User.Entity';
import { UserRepository } from './User.repository';
import bcrypt from 'bcryptjs';

export const createUser = async (
  { name, email, password, username }: User,
  repository = getCustomRepository(UserRepository)
): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, 12);

  return await repository.createAndSave({
    email,
    name,
    username,
    password: hashedPassword,
  });
};

// export class UserService {
//   constructor(public repository = getCustomRepository(UserRepository)) {}

//   async createUser({ name, email, password, username }: User): Promise<User> {
//     const hashedPassword = await bcrypt.hash(password, 12);

//     return await this.repository.createAndSave({
//       email,
//       name,
//       username,
//       password: hashedPassword,
//     });
//   }
// }
