import { GraphQLModule } from '@graphql-modules/core';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import 'reflect-metadata';
import { ConnectionOptions, createConnection } from 'typeorm';
import { User } from './user/User.entity';
import { UserModule } from './user/UserModule';

const options: ConnectionOptions = {
  type: 'sqlite',
  database: './data/db.sqlite',
  entities: [User],
  logging: true,
  synchronize: true,
  dropSchema: true,
};

async function main() {
  await createConnection(options);

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
