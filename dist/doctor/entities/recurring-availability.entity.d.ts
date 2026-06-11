import { DoctorProfile } from './doctor-profile.entity';
export declare class RecurringAvailability {
    id: string;
    doctor: DoctorProfile;
    doctorId: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    createdAt: Date;
    updatedAt: Date;
}
