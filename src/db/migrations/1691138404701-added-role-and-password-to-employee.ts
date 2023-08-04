import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedRoleAndPasswordToEmployee1691138404701 implements MigrationInterface {
    name = 'AddedRoleAndPasswordToEmployee1691138404701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "role" character varying NOT NULL DEFAULT 'Developer'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "password"`);
    }

}
