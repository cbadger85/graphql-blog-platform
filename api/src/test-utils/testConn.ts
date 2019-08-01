import path from 'path';
import {
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
} from 'typeorm';

export const testConn = async (drop: boolean = false) => {
  const connectionOptions = await getConnectionOptions();

  const testConnectionOptions: ConnectionOptions = {
    ...connectionOptions,
    type: 'sqlite',
    database: ':memory:',
    logging: false,
    synchronize: true,
    dropSchema: drop,
    // migrationsRun: true,
    entities: [path.join(__dirname, '..', '/**/*.entity.ts')],
  };

  return createConnection(testConnectionOptions);
};
