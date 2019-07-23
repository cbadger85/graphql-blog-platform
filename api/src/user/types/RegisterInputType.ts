import { InputType, Field } from 'type-graphql';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { IsFieldUnique } from '../validators/IsFieldUnique';

@InputType()
export class RegisterInputType {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  @IsFieldUnique({ message: 'email must be unique' })
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;

  @Field()
  @IsNotEmpty()
  @IsFieldUnique({ message: 'username must be unique' })
  username: string;
}
