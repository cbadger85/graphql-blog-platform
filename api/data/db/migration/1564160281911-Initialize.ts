import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initialize1564160281911 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL UNIQUE, "name" character varying NOT NULL, "username" character varying NOT NULL UNIQUE, "email" character varying NOT NULL UNIQUE, "password" character varying NOT NULL, PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
