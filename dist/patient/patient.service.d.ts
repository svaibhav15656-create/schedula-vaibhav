import { Repository } from 'typeorm';
import { PatientProfile } from './entities/patient-profile.entity';
import { CreatePatientProfileDto } from './dto/create-patient-profile.dto';
import { UpdatePatientProfileDto } from './dto/update-patient-profile.dto';
export declare class PatientService {
    private readonly patientProfileRepo;
    constructor(patientProfileRepo: Repository<PatientProfile>);
    create(userId: string, dto: CreatePatientProfileDto): Promise<PatientProfile>;
    findOne(userId: string): Promise<PatientProfile>;
    update(userId: string, dto: UpdatePatientProfileDto): Promise<PatientProfile>;
}
