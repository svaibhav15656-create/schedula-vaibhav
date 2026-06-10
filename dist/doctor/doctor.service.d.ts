import { Repository } from 'typeorm';
import { DoctorProfile } from './entities/doctor-profile.entity';
import { QueryDoctorDto } from './dto/query-doctor.dto';
import { CreateDoctorProfileDto } from './dto/create-doctor-profile.dto';
import { UpdateDoctorProfileDto } from './dto/update-doctor-profile.dto';
export declare class DoctorService {
    private readonly doctorRepository;
    constructor(doctorRepository: Repository<DoctorProfile>);
    create(userId: string, dto: CreateDoctorProfileDto): Promise<DoctorProfile>;
    findProfile(userId: string): Promise<{
        data: DoctorProfile;
    }>;
    update(userId: string, dto: UpdateDoctorProfileDto): Promise<DoctorProfile>;
    findAll(query: QueryDoctorDto): Promise<{
        message: string;
        data: never[];
        total: number;
        page: number;
        limit: number;
        totalPages?: undefined;
    } | {
        data: DoctorProfile[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        message?: undefined;
    }>;
    findOne(id: string): Promise<{
        data: DoctorProfile;
    }>;
}
