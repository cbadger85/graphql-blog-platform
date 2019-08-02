import {
  Connection,
  getConnectionOptions,
  ConnectionOptions,
  createConnection,
} from 'typeorm';
import { User } from '../../user/User.entity';
import { setupAdminUser } from '../setupAdminUser';

let connection: Connection;

beforeAll(async () => {
  const connectionOptions = await getConnectionOptions();

  const testConnectionOptions: ConnectionOptions = {
    ...connectionOptions,
    database: ':memory:',
    type: 'sqlite',
    synchronize: true,
    logging: false,
    migrationsRun: false,
    entities: [User],
  };
  connection = await createConnection(testConnectionOptions);

  await connection.dropDatabase();
});

afterAll(async () => {
  await connection.close();
});

describe('setupAdminUser', () => {
  it('should create an Admin user', async () => {
    const user = await setupAdminUser(connection);

    expect(user).toBeDefined();
  });
});
