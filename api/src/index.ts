import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection, getConnectionOptions } from 'typeorm';
import path from 'path';

async function main() {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [path.resolve(__dirname + '/**/*.resolver.ts')],
  });
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res }),
  });

  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('server started on http://localhost:4000/graphql');
  });
}

main().catch(console.error);
