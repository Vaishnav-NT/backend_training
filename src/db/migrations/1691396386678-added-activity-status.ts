import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedActivityStatus1691396386678 implements MigrationInterface {
    name = 'AddedActivityStatus1691396386678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "activity_status"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "activity_status" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "activity_status"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "activity_status" boolean NOT NULL`);
    }

}
