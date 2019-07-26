import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
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
`;
