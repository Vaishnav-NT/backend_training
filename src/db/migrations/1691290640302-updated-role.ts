import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedRole1691290640302 implements MigrationInterface {
    name = 'UpdatedRole1691290640302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "activity_status"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "activity_status" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "activity_status"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "activity_status" character varying NOT NULL`);
    }

}
