import { gql } from 'apollo-server-core';
import { execute } from 'graphql';
import 'reflect-metadata';
import { UserProvider } from '../User.provider';
import { UserModule } from '../UserModule';
const { schema, injector } = UserModule;

const user = {
  username: 'username',
  name: 'name',
  password: 'password',
  email: 'email@email.com',
  id: '1',
};

injector.provide({
  provide: UserProvider,
  overwrite: true,
  useValue: {
    createUser: () => user,
  },
} as any);

injector.provide({
  provide: 'UserRepo',
  overwrite: true,
  useValue: () => ({
    createUser: () => user,
    findUserByField: () => undefined,
  }),
});

describe('UserModule', () => {
  it('should create a user and return it', async () => {
    const result = await execute({
      schema,
      document: gql`
        mutation {
          createUser(
            input: {
              name: "name"
              email: "email@gmail.com"
              password: "pass123"
              username: "bob"
            }
          ) {
            id
            name
            email
            username
          }
        }
      `,
    });

    expect(result.data!.createUser).toBeDefined();
  });

  it('should return an error if the input is invalid', async () => {
    const result = await execute({
      schema,
      document: gql`
        mutation {
          createUser(input: {}) {
            id
            name
            email
            username
          }
        }
      `,
    });

    expect(result.errors).toBeDefined();
  });
});
