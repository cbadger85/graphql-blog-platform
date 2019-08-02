import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './types/Role';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { unique: true })
  username: string;

  @Column('text')
  password: string;

  @Column('text', { nullable: true })
  @Generated('uuid')
  sessionId: string;

  @Column('simple-array')
  role: Role[];
}
