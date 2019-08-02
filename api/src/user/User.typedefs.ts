import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
  type User {
    id: String
    username: String
    email: String
    name: String
    role: [String]
  }

  input UserInput {
    username: String!
    name: String!
    password: String!
    email: String!
    role: [String!]!
  }

  type Mutation {
    createUser(input: UserInput!): User
  }

  type Query {
    dummy: String
  }

  type Mutation {
    hello(name: String!): String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type Mutation {
    login(input: LoginInput!): User
  }
`;
