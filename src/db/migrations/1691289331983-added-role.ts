import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedRole1691289331983 implements MigrationInterface {
    name = 'AddedRole1691289331983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "activity_status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "role_id" integer`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_727d9c30d77d3a253177b2e918f" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_727d9c30d77d3a253177b2e918f"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "role_id"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "activity_status"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "role" character varying NOT NULL`);
    }

}
