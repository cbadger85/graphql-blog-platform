import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { Connection, Table, getCustomRepository } from 'typeorm';
import { User } from '../user/User.entity';
import { UserRepository } from '../user/User.repository';
import { Role } from '../user/types/Role';

dotenv.config();

export const setupAdminUser = async (connection: Connection): Promise<User> => {
  const queryRunner = connection.createQueryRunner();

  await queryRunner.createTable(
    new Table({
      name: 'user',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'username',
          type: 'character varying',
          isUnique: true,
          isNullable: false,
        },
        {
          name: 'email',
          type: 'character varying',
          isUnique: true,
          isNullable: false,
        },
        {
          name: 'password',
          type: 'character varying',
          isNullable: false,
        },
        {
          name: 'name',
          type: 'character varying',
          isNullable: false,
        },
        {
          name: 'sessionId',
          type: 'character varying',
          isNullable: true,
        },
        {
          name: 'role',
          type: 'text',
          isNullable: false,
        },
      ],
    })
  );

  const userRepository = getCustomRepository(UserRepository);

  const password = await bcrypt.hash(process.env.ADMIN_PASSWORD as string, 12);
  const user = await userRepository.createUser({
    name: process.env.ADMIN_NAME as string,
    username: process.env.ADMIN_USERNAME as string,
    email: process.env.ADMIN_EMAIL as string,
    role: [Role.ADMIN, Role.EDITOR, Role.WRITER],
    password,
  });

  return user;
};
