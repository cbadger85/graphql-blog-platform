import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryColumn()
  @Generated('uuid')
  id?: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column('text', { unique: true })
  email: string;

  @Field()
  @Column('text')
  username: string;

  @Column()
  password: string;
}
