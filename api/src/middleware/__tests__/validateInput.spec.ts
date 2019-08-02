import { validateInput } from '../validateInput';
import { createUserValidationSchema } from '../validation/createUserValidation';
import { Role } from '../../user/types/Role';

let input: any;

describe('validateInput - createUser Mutation', () => {
  const middlewareWrapper = validateInput(createUserValidationSchema);
  const next = jest.fn();
  const middleware = middlewareWrapper(next);
  beforeEach(() => {
    input = undefined;
  });

  it('should call next() if the input is valid', () => {
    input = {
      name: 'valid name',
      password: 'validpassword',
      email: 'validemail@email.com',
      username: 'validUsername',
      role: [Role.WRITER],
    };

    middleware(undefined, { input }, undefined as any, undefined);

    expect(next).toBeCalledWith(undefined, { input }, undefined, undefined);
  });

  it('should throw an error if the name is not valid', async () => {
    input = {
      name: '',
      password: 'validpassword',
      email: 'validemailemail.com',
      username: 'validUsername',
      role: [Role.WRITER],
    };

    const error = await middleware(
      undefined,
      { input },
      undefined as any,
      undefined
    ).catch(err => err);

    expect(error).toBeInstanceOf(Error);
  });

  it('should throw an error if the password is not valid', async () => {
    input = {
      name: 'name',
      password: 123,
      email: 'validemailemail.com',
      username: 'validUsername',
      role: [Role.WRITER],
    };

    const error = await middleware(
      undefined,
      { input },
      undefined as any,
      undefined
    ).catch(err => err);

    expect(error).toBeInstanceOf(Error);
  });

  it('should throw an error if the email is not valid', async () => {
    input = {
      name: 'name',
      password: 'validPassword',
      email: 'notAnEmail',
      username: 'validUsername',
      role: [Role.WRITER],
    };

    const error = await middleware(
      undefined,
      { input },
      undefined as any,
      undefined
    ).catch(err => err);

    expect(error).toBeInstanceOf(Error);
  });

  it('should throw an error if the username is not valid', async () => {
    input = {
      name: 'name',
      password: 'validPassword',
      email: 'notAnEmail',
      username: '',
      role: [Role.WRITER],
    };

    const error = await middleware(
      undefined,
      { input },
      undefined as any,
      undefined
    ).catch(err => err);

    expect(error).toBeInstanceOf(Error);
  });

  it('should throw an error if the role is not valid', async () => {
    input = {
      name: 'name',
      password: 'validPassword',
      email: 'notAnEmail',
      username: 'validUsername',
      role: ['SUPER'],
    };

    const error = await middleware(
      undefined,
      { input },
      undefined as any,
      undefined
    ).catch(err => err);

    expect(error).toBeInstanceOf(Error);
  });
});
