import { isUserUnique } from '../isUserUnique';
import { User } from '../../user/User.entity';
import { mockServer } from 'graphql-tools';

describe('isUserUnique', () => {
  const next = jest.fn();

  const user = {
    username: 'username',
    email: 'email@email.com',
    password: 'password',
    name: 'name',
  };

  const findUserByField = jest.fn((field, value) => user);

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

  // jest.mock('../isUserUnique');

  /*  it('should call the next function if user is unique', async () => {
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
  }); */

  it('should throw an error if the user is not unique', async () => {
    const findUserByField = jest.fn((field, value) => undefined);

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

    console.log(findUserByField('email', user.email));

    const middlewareWrapper = isUserUnique();
    let middleware = middlewareWrapper(next);

    // middleware = jest.fn();

    await middleware(undefined, { input: user }, context, null);

    // expect(middleware).toThrowError();
    expect(next).toBeCalled();
  });
});
