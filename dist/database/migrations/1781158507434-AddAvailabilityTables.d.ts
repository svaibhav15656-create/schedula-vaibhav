import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddAvailabilityTables1781158507434 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
