import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1717000000000 implements MigrationInterface {
  name = 'CreateUsersTable1717000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "public"."users_role_enum" AS ENUM('DOCTOR', 'PATIENT')
    `);

    await queryRunner.query(`
      CREATE TABLE "users" (
        "id"        UUID NOT NULL DEFAULT gen_random_uuid(),
        "email"     CHARACTER VARYING NOT NULL,
        "password"  CHARACTER VARYING NOT NULL,
        "role"      "public"."users_role_enum" NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_users_email" UNIQUE ("email"),
        CONSTRAINT "PK_users" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}
