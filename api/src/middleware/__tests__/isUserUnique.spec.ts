import { isUserUnique } from '../isUserUnique';
import { User } from '../../user/User.entity';
import { mockServer } from 'graphql-tools';
import { ValidationError } from 'apollo-server-core';

describe('isUserUnique', () => {
  const next = jest.fn();

  const user = {
    username: 'username',
    email: 'email@email.com',
    password: 'password',
    name: 'name',
  };

  let returnedUser: any;

  const findUserByField = jest.fn((field, value) => returnedUser);

  const getRepo = jest.fn((repo: any) => ({
    findUserByField,
  }));

  const context = {
    req: {} as any,
    res: {} as any,
    injector: {
      get: jest.fn(repo => getRepo),
    } as any,
  };

  const middlewareWrapper = isUserUnique();
  const middleware = middlewareWrapper(next);

  beforeEach(() => {
    returnedUser = undefined;
  });

  it('should call the next function if user is unique', async () => {
    await middleware(undefined, { input: user }, context, null);

    expect(next).toBeCalled();
    expect(next).toBeCalledWith(undefined, { input: user }, context, null);
  });

  it('should call findUserByField twice', async () => {
    expect(findUserByField).toBeCalledTimes(2);
  });

  it('should call findUserByField with username and email', () => {
    expect(findUserByField).toBeCalledWith('username', user.username);
    expect(findUserByField).toBeCalledWith('email', user.email);
  });

  it("should throw an error if the user's email is not unique", async () => {
    const { email } = user;

    returnedUser = {
      name: 'name2',
      username: 'username2',
      email,
      password: 'pass123',
    };

    const err = await middleware(
      undefined,
      { input: user },
      context,
      null
    ).catch(err => {
      return err;
    });

    expect(err).toBeInstanceOf(ValidationError);
  });

  it("should throw an error if the user's username is not unique", async () => {
    const { username } = user;

    returnedUser = {
      name: 'name2',
      username,
      email: 'email2@email.com',
      password: 'pass123',
    };

    const err = await middleware(
      undefined,
      { input: user },
      context,
      null
    ).catch(err => {
      return err;
    });

    expect(err).toBeInstanceOf(ValidationError);

    test.todo;
  });
});
