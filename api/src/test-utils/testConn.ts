import path from 'path';
import {
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
} from 'typeorm';

export const testConn = async () => {
  const connectionOptions = await getConnectionOptions();

  const testConnectionOptions: ConnectionOptions = {
    ...connectionOptions,
    type: 'sqlite',
    database: ':memory:',
    logging: false,
    synchronize: true,
    dropSchema: true,
    // migrationsRun: true,
    entities: [path.join(__dirname, '..', '/**/*.entity.ts')],
  };

  return createConnection(testConnectionOptions);
};
