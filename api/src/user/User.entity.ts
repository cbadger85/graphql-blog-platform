import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  username: string;

  @Column('text')
  password: string;
}
