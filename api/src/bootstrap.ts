import bcrypt from 'bcryptjs';
import {
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
  getCustomRepository,
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

  queryRunner.query(
    `CREATE TABLE "user" ("id" SERIAL NOT NULL UNIQUE, "name" character varying NOT NULL, "username" character varying NOT NULL UNIQUE, "email" character varying NOT NULL UNIQUE, "password" character varying NOT NULL, PRIMARY KEY ("id"))`
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
