import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class CreateUsersTable1761050583693 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'int',
            generationStrategy: 'increment',
            isGenerated: true,
            isPrimary: true,
            isNullable: false,
            primaryKeyConstraintName: 'PK_Users_Id',
          }),
          new TableColumn({
            name: 'name',
            type: 'varchar',
            isNullable: false,
            length: '100',
          }),
          new TableColumn({
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
            length: '100',
          }),
          new TableColumn({
            name: 'password_hash',
            type: 'varchar',
            isNullable: false,
            length: '100',
          }),
          new TableColumn({
            name: 'created_at',
            type: 'timestamp with time zone',
            isNullable: false,
            default: 'NOW()',
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
