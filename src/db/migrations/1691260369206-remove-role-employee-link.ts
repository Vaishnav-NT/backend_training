import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveRoleEmployeeLink1691260369206 implements MigrationInterface {
    name = 'RemoveRoleEmployeeLink1691260369206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_727d9c30d77d3a253177b2e918f"`);
        await queryRunner.query(`ALTER TABLE "employees" RENAME COLUMN "role_id" TO "role"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "role" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "role" integer`);
        await queryRunner.query(`ALTER TABLE "employees" RENAME COLUMN "role" TO "role_id"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_727d9c30d77d3a253177b2e918f" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
