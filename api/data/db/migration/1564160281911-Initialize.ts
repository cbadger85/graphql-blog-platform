import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Initialize1564160281911 implements MigrationInterface {
  private tableName = 'user';
  public async up(queryRunner: QueryRunner): Promise<any> {
    // await queryRunner.query(
    //   `CREATE TABLE "user" ("id" SERIAL NOT NULL UNIQUE, "name" character varying NOT NULL, "username" character varying NOT NULL UNIQUE, "email" character varying NOT NULL UNIQUE, "password" character varying NOT NULL, PRIMARY KEY ("id"))`
    // );

    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'username',
            type: 'character varying',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'email',
            type: 'character varying',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'character varying',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'character varying',
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
