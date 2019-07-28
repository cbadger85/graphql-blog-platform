import { validateInput } from '../validateInput';

const middlewareWrapper = validateInput();
const next = jest.fn();
const middleware = middlewareWrapper(next);

let input: any;

describe('validateInput', () => {
  beforeEach(() => {
    input = undefined;
  });

  it('should call next() if the input is valid', () => {
    input = {
      name: 'valid name',
      password: 'validpassword',
      email: 'validemail@email.com',
      username: 'validUsername',
    };

    middleware(undefined, { input }, undefined as any, undefined);

    expect(next).toBeCalledWith(undefined, { input }, undefined, undefined);
  });

  it('should throw an error if the input is not valid', async () => {
    input = {
      name: '',
      password: 'validpassword',
      email: 'validemailemail.com',
      username: 'validUsername',
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
