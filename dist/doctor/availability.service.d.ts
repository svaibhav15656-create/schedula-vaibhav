import { Repository } from 'typeorm';
import { RecurringAvailability } from './entities/recurring-availability.entity';
import { CustomAvailability } from './entities/custom-availability.entity';
import { CreateRecurringAvailabilityDto } from './dto/create-recurring-availability.dto';
import { CreateCustomAvailabilityDto } from './dto/create-custom-availability.dto';
export declare class AvailabilityService {
    private recurringRepo;
    private customRepo;
    constructor(recurringRepo: Repository<RecurringAvailability>, customRepo: Repository<CustomAvailability>);
    private isOverlapping;
    private isValidTimeRange;
    createRecurring(doctorId: string, dto: CreateRecurringAvailabilityDto): Promise<RecurringAvailability>;
    getRecurring(doctorId: string): Promise<{
        message: string;
        data: never[];
    } | {
        data: RecurringAvailability[];
        message?: undefined;
    }>;
    updateRecurring(doctorId: string, id: string, dto: Partial<CreateRecurringAvailabilityDto>): Promise<RecurringAvailability>;
    deleteRecurring(doctorId: string, id: string): Promise<{
        message: string;
    }>;
    createOverride(doctorId: string, dto: CreateCustomAvailabilityDto): Promise<CustomAvailability>;
    getByDate(doctorId: string, date: string): Promise<{
        source: string;
        data: CustomAvailability[];
        message?: undefined;
    } | {
        message: string;
        data: never[];
        source?: undefined;
    } | {
        source: string;
        data: RecurringAvailability[];
        message?: undefined;
    }>;
}
