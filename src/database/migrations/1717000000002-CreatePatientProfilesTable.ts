import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePatientProfilesTable1717000000002 implements MigrationInterface {
  name = 'CreatePatientProfilesTable1717000000002';

  public async up(queryRunner: QueryRunner): Promise<void> {
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

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "patient_profiles"`);
  }
}
