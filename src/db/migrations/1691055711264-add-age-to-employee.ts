import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAgeToEmployee1691055711264 implements MigrationInterface {
    name = "AddAgeToEmployee1691055711264";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "age" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "age"`);
    }
}
