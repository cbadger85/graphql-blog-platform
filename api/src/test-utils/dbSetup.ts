import { testConn } from './testConn';

testConn(true)
  .then(conn => conn.synchronize())
  .then(() => process.exit())
  .catch();
