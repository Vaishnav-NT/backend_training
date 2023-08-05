import { MigrationInterface, QueryRunner } from "typeorm";

export class ChnagedEmailToUsername1691209207886 implements MigrationInterface {
    name = 'ChnagedEmailToUsername1691209207886'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" RENAME COLUMN "email" TO "username"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" RENAME COLUMN "username" TO "email"`);
    }

}
