import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRole1691238083111 implements MigrationInterface {
    name = 'CreateRole1691238083111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" RENAME COLUMN "role" TO "role_id"`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "role_id"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "role_id" integer`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_727d9c30d77d3a253177b2e918f" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_727d9c30d77d3a253177b2e918f"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "role_id"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "role_id" character varying NOT NULL DEFAULT 'Developer'`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`ALTER TABLE "employees" RENAME COLUMN "role_id" TO "role"`);
    }

}
