import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedActivityStatus1691396479127 implements MigrationInterface {
    name = 'AddedActivityStatus1691396479127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "activity_status"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "activity_status" character varying NOT NULL DEFAULT 'Active'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "activity_status"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "activity_status" boolean NOT NULL`);
    }

}
