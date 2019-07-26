import { GraphQLModule } from '@graphql-modules/core';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import 'reflect-metadata';
import { createConnection, getConnectionOptions } from 'typeorm';
import { User } from './user/User.entity';
import { UserModule } from './user/UserModule';

async function main() {
  const connectionOptions = await getConnectionOptions();
  await createConnection({
    ...connectionOptions,
    entities: [User],
  });

  const graphqlModules = new GraphQLModule({
    imports: [UserModule],
  });

  const apolloServer = new ApolloServer({
    schema: graphqlModules.schema,
    context: ({ req, res }: any) => ({ req, res }),
  });

  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('server started on http://localhost:4000/graphql');
  });
}

main().catch(console.error);
