import { createConnection, getConnectionOptions } from 'typeorm';
import path from 'path';

export const testConn = async (drop: boolean = false) => {
  const connectionOptions = await getConnectionOptions();

  const dbPath = path.resolve(__dirname + '/../../data/db.test.sqlite');

  const testConnectionOptions = {
    ...connectionOptions,
    database: dbPath as any,
    logging: false,
    synchronize: drop,
    dropSchema: drop,
  };

  return createConnection(testConnectionOptions);
};
