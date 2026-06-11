import { AvailabilityService } from './availability.service';
import { CreateRecurringAvailabilityDto } from './dto/create-recurring-availability.dto';
import { CreateCustomAvailabilityDto } from './dto/create-custom-availability.dto';
export declare class AvailabilityController {
    private readonly availabilityService;
    constructor(availabilityService: AvailabilityService);
    createRecurring(req: any, dto: CreateRecurringAvailabilityDto): Promise<import("./entities/recurring-availability.entity").RecurringAvailability>;
    getRecurring(req: any): Promise<{
        message: string;
        data: never[];
    } | {
        data: import("./entities/recurring-availability.entity").RecurringAvailability[];
        message?: undefined;
    }>;
    updateRecurring(req: any, id: string, dto: Partial<CreateRecurringAvailabilityDto>): Promise<import("./entities/recurring-availability.entity").RecurringAvailability>;
    deleteRecurring(req: any, id: string): Promise<{
        message: string;
    }>;
    createOverride(req: any, dto: CreateCustomAvailabilityDto): Promise<import("./entities/custom-availability.entity").CustomAvailability>;
    getByDate(req: any, date: string): Promise<{
        source: string;
        data: import("./entities/custom-availability.entity").CustomAvailability[];
        message?: undefined;
    } | {
        message: string;
        data: never[];
        source?: undefined;
    } | {
        source: string;
        data: import("./entities/recurring-availability.entity").RecurringAvailability[];
        message?: undefined;
    }>;
}
