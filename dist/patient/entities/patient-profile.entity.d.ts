import { User } from '../../users/entities/user.entity';
export declare class PatientProfile {
    id: string;
    user: User;
    userId: string;
    fullName: string;
    age: number;
    gender: string;
    contactNumber: string;
    address: string;
    basicHealthInfo: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
