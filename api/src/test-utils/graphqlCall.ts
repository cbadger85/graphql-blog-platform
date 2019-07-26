import { graphql, GraphQLSchema } from 'graphql';
import { Request, Response } from 'express';
import { buildSchema, Maybe } from 'type-graphql';
import path from 'path';

const createSchema = () => {
  return buildSchema({
    resolvers: [path.resolve(__dirname + '/../**/*.resolver.ts')],
  });
};

interface Options {
  source: string;
  variableValues?: Maybe<{ [key: string]: any }>;
  req?: Request;
  res?: Response;
}

let schema: GraphQLSchema;

export const graphqlCall = async ({
  source,
  variableValues,
  req,
  res,
}: Options) => {
  if (!schema) {
    schema = await createSchema();
  }

  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      req,
      res,
    },
  });
};
