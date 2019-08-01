import { testConn } from './testConn';

testConn()
  .then(conn => conn.synchronize())
  .then(() => process.exit())
  .catch();
