import { testConn } from '../../test/testConn';
import { Connection, getCustomRepository } from 'typeorm';
import { graphqlCall } from '../../test/graphqlCall';
import { UserRepository } from '../User.repository';

let conn: Connection;
let userRepository: UserRepository;

beforeAll(async () => {
  conn = await testConn();
  userRepository = getCustomRepository(UserRepository);
});

afterAll(async () => {
  await conn.close();
});

const RegisterMutation = `
  mutation Register($input: RegisterInputType!) {
    register(
      input: $input
    ) {
      id
      username
      email
      name
    }
  }

`;

describe('Register', () => {
  it('creates a user', async () => {
    const user = {
      name: 'name',
      email: 'email@email.com',
      username: 'username',
      password: 'pass123',
    };

    const response = await graphqlCall({
      source: RegisterMutation,
      variableValues: {
        input: user,
      },
    });

    expect(response).toMatchObject({
      data: {
        register: {
          username: user.username,
          email: user.email,
          name: user.name,
        },
      },
    });

    const dbUser = await userRepository.findOne({
      where: { email: user.email },
    });

    expect(dbUser).toBeDefined();
  });

  it('should return an error if the user field is empty', async () => {
    const user = {
      name: '',
      email: 'email2@email.com',
      username: 'username',
      password: 'pass123',
    };

    const response = await graphqlCall({
      source: RegisterMutation,
      variableValues: {
        input: user,
      },
    });

    expect(response.errors).toBeDefined();
    expect(response.data).toBeDefined();
  });

  it('should return an error if the email field is empty', async () => {
    const user = {
      name: 'name',
      email: '',
      username: 'username',
      password: 'pass123',
    };

    const response = await graphqlCall({
      source: RegisterMutation,
      variableValues: {
        input: user,
      },
    });

    expect(response.errors).toBeDefined();
    expect(response.data).toBeDefined();
  });

  it('should return an error if the email field is invalid', async () => {
    const user = {
      name: 'name',
      email: 'bad email',
      username: 'username',
      password: 'pass123',
    };

    const response = await graphqlCall({
      source: RegisterMutation,
      variableValues: {
        input: user,
      },
    });

    expect(response.errors).toBeDefined();
    expect(response.data).toBeDefined();
  });

  it('should return an error if the username field is empty', async () => {
    const user = {
      name: 'name',
      email: 'email2@email.com',
      username: '',
      password: 'pass123',
    };

    const response = await graphqlCall({
      source: RegisterMutation,
      variableValues: {
        input: user,
      },
    });

    expect(response.errors).toBeDefined();
    expect(response.data).toBeDefined();
  });

  it('should return an error if the password field is empty', async () => {
    const user = {
      name: 'name',
      email: 'email2@email.com',
      username: 'username',
      password: '',
    };

    const response = await graphqlCall({
      source: RegisterMutation,
      variableValues: {
        input: user,
      },
    });

    expect(response.errors).toBeDefined();
    expect(response.data).toBeDefined();
  });

  it('should return an error if the email exists', async () => {
    const user = {
      name: 'name',
      email: 'email@email.com',
      username: 'username2',
      password: 'pass123',
    };

    const response = await graphqlCall({
      source: RegisterMutation,
      variableValues: {
        input: user,
      },
    });

    expect(response.errors).toBeDefined();
    expect(response.data).toBeDefined();
  });

  it('should return an error if the username exists', async () => {
    const user = {
      name: 'name',
      email: 'email2@email.com',
      username: 'username',
      password: 'pass123',
    };

    const response = await graphqlCall({
      source: RegisterMutation,
      variableValues: {
        input: user,
      },
    });

    expect(response.errors).toBeDefined();
    expect(response.data).toBeDefined();
  });
});
