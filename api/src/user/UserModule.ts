import { GraphQLModule } from '@graphql-modules/core';
import { UserProvider } from './User.provider';
import { UserRepository } from './User.repository';
import { UserResolver } from './User.resolver';
import { getCustomRepository } from 'typeorm';
import { userTypeDefs } from './User.typedefs';
import { testMiddleware, validateInput } from './middleware/testMiddleware';

export const UserModule = new GraphQLModule({
  providers: [
    {
      provide: 'UserRepo',
      useValue: () => getCustomRepository(UserRepository),
    },
    UserProvider,
  ],
  resolvers: [UserResolver],
  typeDefs: userTypeDefs,
  resolversComposition: {
    'Mutation.register': [testMiddleware(), validateInput()],
  },
});
