import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  @Generated('increment')
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
}
