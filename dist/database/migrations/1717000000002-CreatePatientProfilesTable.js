"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePatientProfilesTable1717000000002 = void 0;
class CreatePatientProfilesTable1717000000002 {
    name = 'CreatePatientProfilesTable1717000000002';
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE "patient_profiles" (
        "id"              UUID NOT NULL DEFAULT gen_random_uuid(),
        "userId"          UUID NOT NULL,
        "fullName"        CHARACTER VARYING NOT NULL,
        "age"             INTEGER NOT NULL,
        "gender"          CHARACTER VARYING NOT NULL,
        "contactNumber"   CHARACTER VARYING NOT NULL,
        "address"         CHARACTER VARYING,
        "basicHealthInfo" JSONB,
        "createdAt"       TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt"       TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_patient_profiles_userId" UNIQUE ("userId"),
        CONSTRAINT "PK_patient_profiles" PRIMARY KEY ("id"),
        CONSTRAINT "FK_patient_profiles_userId"
          FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
      )
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "patient_profiles"`);
    }
}
exports.CreatePatientProfilesTable1717000000002 = CreatePatientProfilesTable1717000000002;
//# sourceMappingURL=1717000000002-CreatePatientProfilesTable.js.map