import { DoctorProfile } from './doctor-profile.entity';
export declare class CustomAvailability {
    id: string;
    doctor: DoctorProfile;
    doctorId: string;
    date: string;
    startTime: string;
    endTime: string;
    createdAt: Date;
    updatedAt: Date;
}
