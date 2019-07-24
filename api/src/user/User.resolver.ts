import 'reflect-metadata';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User } from './User.entity';
import { createUser } from './User.service';
import { RegisterInputType } from './types/RegisterInputType';

@Resolver()
export class RegisterResolver {
  @Query()
  hello(): string {
    return 'hello-world';
  }

  @Mutation(() => User)
  async register(@Arg('input') user: RegisterInputType): Promise<User> {
    return await createUser(user);
  }
}
