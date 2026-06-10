"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersTable1717000000000 = void 0;
class CreateUsersTable1717000000000 {
    name = 'CreateUsersTable1717000000000';
    async up(queryRunner) {
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
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }
}
exports.CreateUsersTable1717000000000 = CreateUsersTable1717000000000;
//# sourceMappingURL=1717000000000-CreateUsersTable.js.map