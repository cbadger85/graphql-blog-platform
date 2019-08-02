import { ValidationError } from 'apollo-server-core';
import { isUserUnique } from '../isUserUnique';
import { Role } from '../../user/types/Role';

describe('isUserUnique', () => {
  const input = {
    id: 1,
    username: 'username',
    email: 'email@email.com',
    password: 'password',
    name: 'name',
    sessionId: 'session123',
    role: [Role.WRITER],
  };

  let returnedUser: any;

  const findUserByField = jest.fn(() => returnedUser);

  const getRepo = jest.fn(() => ({
    findUserByField,
  }));

  const context = {
    req: {} as any,
    res: {} as any,
    injector: {
      get: jest.fn(() => getRepo),
    } as any,
  };

  const middlewareWrapper = isUserUnique();
  const next = jest.fn();
  const middleware = middlewareWrapper(next);

  beforeEach(() => {
    returnedUser = undefined;
  });

  it('should call the next function if user is unique', async () => {
    await middleware(undefined, { input }, context, null);

    expect(next).toBeCalledWith(undefined, { input }, context, null);
  });

  it('should call findUserByField twice', async () => {
    expect(findUserByField).toBeCalledTimes(2);
  });

  it('should call findUserByField with username and email', () => {
    expect(findUserByField).toBeCalledWith('username', input.username);
    expect(findUserByField).toBeCalledWith('email', input.email);
  });

  it("should throw an error if the user's email is not unique", async () => {
    const { email } = input;

    returnedUser = {
      name: 'name2',
      username: 'username2',
      email,
      password: 'pass123',
    };

    const err = await middleware(undefined, { input }, context, null).catch(
      err => {
        return err;
      }
    );

    expect(err).toBeInstanceOf(ValidationError);
  });

  it("should throw an error if the user's username is not unique", async () => {
    const { username } = input;

    returnedUser = {
      name: 'name2',
      username,
      email: 'email2@email.com',
      password: 'pass123',
    };

    const err = await middleware(undefined, { input }, context, null).catch(
      err => {
        return err;
      }
    );

    expect(err).toBeInstanceOf(ValidationError);

    test.todo;
  });
});
