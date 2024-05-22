import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrationTest1714533206594 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "Users" RENAME COLUMN "name" TO "fullname"',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "Users" RENAME COLUMN "fullname" TO "name"',
    );
  }
}
