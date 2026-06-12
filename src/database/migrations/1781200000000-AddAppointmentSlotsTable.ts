import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAppointmentSlotsTable1781200000000 implements MigrationInterface {
    name = 'AddAppointmentSlotsTable1781200000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."appointment_slots_status_enum" AS ENUM ('available', 'booked')
        `);
        await queryRunner.query(`
            CREATE TABLE "appointment_slots" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "doctorId" uuid NOT NULL,
                "date" date NOT NULL,
                "startTime" TIME NOT NULL,
                "endTime" TIME NOT NULL,
                "status" "public"."appointment_slots_status_enum" NOT NULL DEFAULT 'available',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_appointment_slots" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_slots"
            ADD CONSTRAINT "FK_appointment_slots_doctorId"
            FOREIGN KEY ("doctorId") REFERENCES "doctor_profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment_slots" DROP CONSTRAINT "FK_appointment_slots_doctorId"`);
        await queryRunner.query(`DROP TABLE "appointment_slots"`);
        await queryRunner.query(`DROP TYPE "public"."appointment_slots_status_enum"`);
    }
}