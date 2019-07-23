import { getCustomRepository } from 'typeorm';
import { User } from './User.Entity';
import { UserRepository } from './User.repository';
import bcrypt from 'bcryptjs';

const userRepository = getCustomRepository(UserRepository);

export const createUser = async ({
  name,
  email,
  password,
  username,
}: User): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, 12);

  return await userRepository.createAndSave({
    email,
    name,
    username,
    password: hashedPassword,
  });
};
