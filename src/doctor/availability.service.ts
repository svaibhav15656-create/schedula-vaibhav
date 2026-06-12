import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecurringAvailability } from './entities/recurring-availability.entity';
import { CustomAvailability } from './entities/custom-availability.entity';
import { DoctorProfile } from './entities/doctor-profile.entity';
import { CreateRecurringAvailabilityDto } from './dto/create-recurring-availability.dto';
import { CreateCustomAvailabilityDto } from './dto/create-custom-availability.dto';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(RecurringAvailability)
    private recurringRepo: Repository<RecurringAvailability>,
    @InjectRepository(CustomAvailability)
    private customRepo: Repository<CustomAvailability>,
    @InjectRepository(DoctorProfile)
    private doctorRepo: Repository<DoctorProfile>,
  ) {}

  private async getDoctorId(userId: string): Promise<string> {
    const doctor = await this.doctorRepo.findOne({ where: { userId } });
    if (!doctor) {
      throw new NotFoundException('Doctor profile not found. Please onboard first.');
    }
    return doctor.id;
  }

  private isOverlapping(start1: string, end1: string, start2: string, end2: string): boolean {
    return start1 < end2 && start2 < end1;
  }

  private isValidTimeRange(start: string, end: string): boolean {
    return start < end;
  }

  async createRecurring(userId: string, dto: CreateRecurringAvailabilityDto) {
    const doctorId = await this.getDoctorId(userId);

    if (!this.isValidTimeRange(dto.startTime, dto.endTime)) {
      throw new BadRequestException('End time must be after start time');
    }

    const existing = await this.recurringRepo.find({
      where: { doctorId, dayOfWeek: dto.dayOfWeek },
    });

    for (const slot of existing) {
      if (this.isOverlapping(dto.startTime, dto.endTime, slot.startTime, slot.endTime)) {
        throw new BadRequestException('Time slot overlaps with existing availability');
      }
    }

    const duplicate = existing.find(
      (s) => s.startTime === dto.startTime && s.endTime === dto.endTime,
    );
    if (duplicate) {
      throw new BadRequestException('Duplicate availability entry');
    }

    const availability = this.recurringRepo.create({ ...dto, doctorId });
    return this.recurringRepo.save(availability);
  }

  async getRecurring(userId: string) {
    const doctorId = await this.getDoctorId(userId);
    const slots = await this.recurringRepo.find({ where: { doctorId } });
    if (slots.length === 0) {
      return { message: 'No recurring availability found', data: [] };
    }
    return { data: slots };
  }

  async updateRecurring(userId: string, id: string, dto: Partial<CreateRecurringAvailabilityDto>) {
    const doctorId = await this.getDoctorId(userId);
    const slot = await this.recurringRepo.findOne({ where: { id, doctorId } });
    if (!slot) {
      throw new NotFoundException('Availability slot not found');
    }

    const updatedStart = dto.startTime || slot.startTime;
    const updatedEnd = dto.endTime || slot.endTime;

    if (!this.isValidTimeRange(updatedStart, updatedEnd)) {
      throw new BadRequestException('End time must be after start time');
    }

    Object.assign(slot, dto);
    return this.recurringRepo.save(slot);
  }

  async deleteRecurring(userId: string, id: string) {
    const doctorId = await this.getDoctorId(userId);
    const slot = await this.recurringRepo.findOne({ where: { id, doctorId } });
    if (!slot) {
      throw new NotFoundException('Availability slot not found');
    }
    await this.recurringRepo.remove(slot);
    return { message: 'Availability slot deleted successfully' };
  }

  async createOverride(userId: string, dto: CreateCustomAvailabilityDto) {
    const doctorId = await this.getDoctorId(userId);

    if (!this.isValidTimeRange(dto.startTime, dto.endTime)) {
      throw new BadRequestException('End time must be after start time');
    }

    const existing = await this.customRepo.find({
      where: { doctorId, date: dto.date },
    });

    for (const slot of existing) {
      if (this.isOverlapping(dto.startTime, dto.endTime, slot.startTime, slot.endTime)) {
        throw new BadRequestException('Time slot overlaps with existing override');
      }
    }

    const override = this.customRepo.create({ ...dto, doctorId });
    return this.customRepo.save(override);
  }

  async getByDate(userId: string, date: string) {
    const doctorId = await this.getDoctorId(userId);

    if (!date) {
      throw new BadRequestException('Date is required');
    }

    const customSlots = await this.customRepo.find({
      where: { doctorId, date },
    });

    if (customSlots.length > 0) {
      return { source: 'custom_override', data: customSlots };
    }

    const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
    const recurringSlots = await this.recurringRepo.find({
      where: { doctorId, dayOfWeek },
    });

    if (recurringSlots.length === 0) {
      return { message: 'No availability for this date', data: [] };
    }

    return { source: 'recurring', data: recurringSlots };
  }
}