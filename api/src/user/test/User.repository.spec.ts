import { testConn } from '../../test/testConn';
import { Connection, getCustomRepository } from 'typeorm';
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

describe('User Repository', () => {
  const user = {
    username: 'username1',
    name: 'first last',
    email: 'test@test.com',
    password: 'pass123',
  };

  let userId: string | undefined;

  it('should save a user to the database', async () => {
    const createdUser = await userRepository.createAndSave(user);

    userId = createdUser.id;

    expect(createdUser).toMatchObject({
      name: user.name,
      email: user.email,
      username: user.username,
      password: user.password,
    });

    expect(createdUser.id).toBeDefined();
  });

  it('should exist in the database', async () => {
    const retrievedUser = await userRepository.findOne(userId);

    expect(retrievedUser).toMatchObject(user);
  });

  it('should find a user by field', async () => {
    const retrievedUser = await userRepository.findByField('email', user.email);

    expect(retrievedUser).toMatchObject(user);
  });
});
