import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorProfile } from './entities/doctor-profile.entity';
import { RecurringAvailability } from './entities/recurring-availability.entity';
import { CustomAvailability } from './entities/custom-availability.entity';
import { AppointmentSlot } from './entities/appointment-slot.entity';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { AvailabilityService } from './availability.service';
import { AvailabilityController } from './availability.controller';
import { SlotService } from './slot.service';
import { SlotController } from './slot.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorProfile, RecurringAvailability, CustomAvailability, AppointmentSlot])],
  controllers: [DoctorController, AvailabilityController, SlotController],
  providers: [DoctorService, AvailabilityService, SlotService],
})
export class DoctorModule {}