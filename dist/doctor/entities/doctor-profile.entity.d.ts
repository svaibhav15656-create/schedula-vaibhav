import { User } from '../../users/entities/user.entity';
export declare class DoctorProfile {
    id: string;
    user: User;
    userId: string;
    fullName: string;
    specialization: string;
    experience: number;
    qualification: string;
    consultationFee: number;
    availabilityHours: Record<string, any>;
    profileDetails: string;
    createdAt: Date;
    updatedAt: Date;
}
