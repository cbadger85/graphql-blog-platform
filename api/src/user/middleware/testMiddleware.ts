import { ContextType } from 'src/types/ContextType';

export const testMiddleware = () => (next: Function) => async (
  _root: undefined,
  _args: undefined,
  context: ContextType,
  _info: undefined
) => {
  console.log('!!!!! this is an example of middleware !!!!!');

  return next(_root, _args, context, _info);
};
