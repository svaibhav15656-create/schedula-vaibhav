"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDoctorProfilesTable1717000000001 = void 0;
class CreateDoctorProfilesTable1717000000001 {
    name = 'CreateDoctorProfilesTable1717000000001';
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE "doctor_profiles" (
        "id"                UUID NOT NULL DEFAULT gen_random_uuid(),
        "userId"            UUID NOT NULL,
        "fullName"          CHARACTER VARYING NOT NULL,
        "specialization"    CHARACTER VARYING NOT NULL,
        "experience"        INTEGER NOT NULL,
        "qualification"     CHARACTER VARYING NOT NULL,
        "consultationFee"   NUMERIC(10, 2) NOT NULL,
        "availabilityHours" JSONB,
        "profileDetails"    CHARACTER VARYING,
        "createdAt"         TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt"         TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_doctor_profiles_userId" UNIQUE ("userId"),
        CONSTRAINT "PK_doctor_profiles" PRIMARY KEY ("id"),
        CONSTRAINT "FK_doctor_profiles_userId"
          FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
      )
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "doctor_profiles"`);
    }
}
exports.CreateDoctorProfilesTable1717000000001 = CreateDoctorProfilesTable1717000000001;
//# sourceMappingURL=1717000000001-CreateDoctorProfilesTable.js.map