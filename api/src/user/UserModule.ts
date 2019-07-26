import { GraphQLModule } from '@graphql-modules/core';
import { gql } from 'apollo-server-express';
import { UserProvider } from './User.provider';
import { UserRepository } from './User.repository';
import { UserResolver } from './User.resolver';
import { getCustomRepository } from 'typeorm';

export const UserModule = new GraphQLModule({
  providers: [
    {
      provide: 'UserRepo',
      useValue: () => getCustomRepository(UserRepository),
    },
    UserProvider,
  ],
  resolvers: [UserResolver],
  typeDefs: gql`
    type User {
      id: String
      username: String
      email: String
      name: String
    }

    input UserInput {
      username: String!
      name: String!
      password: String!
      email: String!
    }

    type Mutation {
      register(input: UserInput!): User
    }

    type Query {
      dummy: String
    }

    type Mutation {
      hello(name: String!): String!
    }
  `,
});
