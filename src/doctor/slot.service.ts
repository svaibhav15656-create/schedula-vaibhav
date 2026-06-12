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
import { AppointmentSlot, SlotStatus } from './entities/appointment-slot.entity';

@Injectable()
export class SlotService {
  constructor(
    @InjectRepository(RecurringAvailability)
    private recurringRepo: Repository<RecurringAvailability>,
    @InjectRepository(CustomAvailability)
    private customRepo: Repository<CustomAvailability>,
    @InjectRepository(DoctorProfile)
    private doctorRepo: Repository<DoctorProfile>,
    @InjectRepository(AppointmentSlot)
    private slotRepo: Repository<AppointmentSlot>,
  ) {}

  private generateTimeSlots(
    startTime: string,
    endTime: string,
    durationMinutes: number,
  ): { startTime: string; endTime: string }[] {
    const slots: { startTime: string; endTime: string }[] = [];

    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);

    let current = startH * 60 + startM;
    const end = endH * 60 + endM;

    while (current + durationMinutes <= end) {
      const slotStart = this.minutesToTime(current);
      const slotEnd = this.minutesToTime(current + durationMinutes);
      slots.push({ startTime: slotStart, endTime: slotEnd });
      current += durationMinutes;
    }

    return slots;
  }

  private minutesToTime(minutes: number): string {
    const h = Math.floor(minutes / 60).toString().padStart(2, '0');
    const m = (minutes % 60).toString().padStart(2, '0');
    return `${h}:${m}`;
  }

  private isValidDate(dateStr: string): boolean {
    const d = new Date(dateStr);
    return !isNaN(d.getTime()) && /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
  }

  async getAvailableSlots(
    doctorId: string,
    date: string,
    durationMinutes: number = 30,
  ) {
    // Validate doctor
    const doctor = await this.doctorRepo.findOne({ where: { id: doctorId } });
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    // Validate date
    if (!date || !this.isValidDate(date)) {
      throw new BadRequestException('Invalid date. Use YYYY-MM-DD format');
    }

    // Validate duration
    const validDurations = [10, 15, 20, 30, 45, 60];
    if (!validDurations.includes(durationMinutes)) {
      throw new BadRequestException(
        `Invalid slot duration. Allowed values: ${validDurations.join(', ')} minutes`,
      );
    }

    // Reject past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const requestedDate = new Date(date);
    requestedDate.setHours(0, 0, 0, 0);

    if (requestedDate < today) {
      throw new BadRequestException('Cannot fetch slots for past dates');
    }

    // Custom override takes precedence over recurring
    const customAvailability = await this.customRepo.find({
      where: { doctorId, date },
    });

    let availabilityWindows: { startTime: string; endTime: string }[] = [];
    let source: string;

    if (customAvailability.length > 0) {
      source = 'custom_override';
      availabilityWindows = customAvailability.map((a) => ({
        startTime: a.startTime.slice(0, 5),
        endTime: a.endTime.slice(0, 5),
      }));
    } else {
      const dayOfWeek = new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'long',
      });
      const recurringAvailability = await this.recurringRepo.find({
        where: { doctorId, dayOfWeek },
      });

      if (recurringAvailability.length === 0) {
        return {
          message: 'No availability found for this date',
          date,
          doctorId,
          slots: [],
        };
      }

      source = 'recurring';
      availabilityWindows = recurringAvailability.map((a) => ({
        startTime: a.startTime.slice(0, 5),
        endTime: a.endTime.slice(0, 5),
      }));
    }

    // Generate slots from all windows
    const allSlots: { startTime: string; endTime: string }[] = [];
    for (const window of availabilityWindows) {
      const windowSlots = this.generateTimeSlots(
        window.startTime,
        window.endTime,
        durationMinutes,
      );
      allSlots.push(...windowSlots);
    }

    if (allSlots.length === 0) {
      return {
        message: 'No slots can be generated for this date with the given duration',
        date,
        doctorId,
        durationMinutes,
        slots: [],
      };
    }

    // Get booked slots
    const bookedSlots = await this.slotRepo.find({
      where: { doctorId, date, status: SlotStatus.BOOKED },
    });
    const bookedSet = new Set(
      bookedSlots.map((s) => `${s.startTime.slice(0, 5)}-${s.endTime.slice(0, 5)}`),
    );

    // Filter past slots (only for today)
    const now = new Date();
    const isToday = requestedDate.getTime() === today.getTime();
    const nowMinutes = isToday ? now.getHours() * 60 + now.getMinutes() : 0;

    const availableSlots = allSlots.filter((slot) => {
      if (bookedSet.has(`${slot.startTime}-${slot.endTime}`)) return false;
      if (isToday) {
        const [h, m] = slot.startTime.split(':').map(Number);
        if (h * 60 + m <= nowMinutes) return false;
      }
      return true;
    });

    if (availableSlots.length === 0) {
      return {
        message: 'No available slots for this date',
        date,
        doctorId,
        slots: [],
      };
    }

    return {
      date,
      doctorId,
      durationMinutes,
      source,
      totalSlots: availableSlots.length,
      slots: availableSlots,
    };
  }
}