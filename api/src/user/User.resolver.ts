import 'reflect-metadata';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User } from './User.entity';
import { UserService } from './User.service';
import { RegisterInputType } from './types/RegisterInputType';

@Resolver()
export class RegisterResolver {
  constructor(private userService = new UserService()) {}

  @Query()
  hello(): string {
    return 'hello-world';
  }

  @Mutation(() => User)
  async register(@Arg('input') user: RegisterInputType): Promise<User> {
    return await this.userService.createUser(user);
  }
}
