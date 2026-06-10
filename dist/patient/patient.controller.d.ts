import { PatientService } from './patient.service';
import { CreatePatientProfileDto } from './dto/create-patient-profile.dto';
import { UpdatePatientProfileDto } from './dto/update-patient-profile.dto';
export declare class PatientController {
    private readonly patientService;
    constructor(patientService: PatientService);
    create(req: any, dto: CreatePatientProfileDto): Promise<import("./entities/patient-profile.entity").PatientProfile>;
    getProfile(req: any): Promise<import("./entities/patient-profile.entity").PatientProfile>;
    update(req: any, dto: UpdatePatientProfileDto): Promise<import("./entities/patient-profile.entity").PatientProfile>;
}
