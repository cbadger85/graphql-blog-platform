import bcrypt from 'bcryptjs';
import {
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
  getCustomRepository,
  Table,
} from 'typeorm';
import { User } from './user/User.entity';
import { UserRepository } from './user/User.repository';
import dotenv from 'dotenv';

dotenv.config();

const bootstrap = async () => {
  const connectionOptions = await getConnectionOptions();

  const testConnectionOptions: ConnectionOptions = {
    ...connectionOptions,
    logging: false,
    dropSchema: true,
    migrationsRun: false,
    entities: [User],
  };

  const connection = await createConnection(testConnectionOptions);
  await connection.dropDatabase();

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
      ],
    })
  );

  const userRepository = getCustomRepository(UserRepository);

  const password = await bcrypt.hash(process.env.ADMIN_PASSWORD as string, 12);
  await userRepository.createUser({
    name: process.env.ADMIN_NAME as string,
    username: process.env.ADMIN_USERNAME as string,
    email: process.env.ADMIN_EMAIL as string,
    password,
  });

  await connection.close();
};

bootstrap()
  .then(() => process.exit())
  .catch(e => console.log(e));
