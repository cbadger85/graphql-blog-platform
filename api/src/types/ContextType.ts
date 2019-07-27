import { Request, Response } from 'express';
import { ModuleContext } from '@graphql-modules/core';

export interface ContextType extends ModuleContext {
  req: Request;
  res: Response;
}
