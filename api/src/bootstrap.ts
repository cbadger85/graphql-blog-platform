import {
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
} from 'typeorm';
import { User } from './user/User.entity';
import { setupAdminUser } from './utils/setupAdminUser';

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

  await setupAdminUser(connection);

  await connection.close();
};

bootstrap()
  .then(() => process.exit())
  .catch(e => console.log(e));
