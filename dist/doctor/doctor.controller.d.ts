import { DoctorService } from './doctor.service';
import { QueryDoctorDto } from './dto/query-doctor.dto';
import { CreateDoctorProfileDto } from './dto/create-doctor-profile.dto';
import { UpdateDoctorProfileDto } from './dto/update-doctor-profile.dto';
export declare class DoctorController {
    private readonly doctorService;
    constructor(doctorService: DoctorService);
    create(req: any, dto: CreateDoctorProfileDto): Promise<import("./entities/doctor-profile.entity").DoctorProfile>;
    getProfile(req: any): Promise<{
        data: import("./entities/doctor-profile.entity").DoctorProfile;
    }>;
    update(req: any, dto: UpdateDoctorProfileDto): Promise<import("./entities/doctor-profile.entity").DoctorProfile>;
    findAll(query: QueryDoctorDto): Promise<{
        message: string;
        data: never[];
        total: number;
        page: number;
        limit: number;
        totalPages?: undefined;
    } | {
        data: import("./entities/doctor-profile.entity").DoctorProfile[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        message?: undefined;
    }>;
    findById(id: string): Promise<{
        data: import("./entities/doctor-profile.entity").DoctorProfile;
    }>;
}
