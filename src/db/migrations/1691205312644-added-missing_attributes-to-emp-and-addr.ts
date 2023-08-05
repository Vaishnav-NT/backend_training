import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedMissingAttributesToEmpAndAddr1691205312644 implements MigrationInterface {
    name = 'AddedMissingAttributesToEmpAndAddr1691205312644'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line1"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "address_line_1" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "address_line_2" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "country" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "joining_date" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "experience" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "joining_date"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "address_line_2"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "address_line_1"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "line1" character varying NOT NULL`);
    }

}
