import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientProfile } from './entities/patient-profile.entity';
import { CreatePatientProfileDto } from './dto/create-patient-profile.dto';
import { UpdatePatientProfileDto } from './dto/update-patient-profile.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientProfile)
    private readonly patientProfileRepo: Repository<PatientProfile>,
  ) {}

  async create(
    userId: string,
    dto: CreatePatientProfileDto,
  ): Promise<PatientProfile> {
    const existing = await this.patientProfileRepo.findOne({
      where: { userId },
    });

    if (existing) {
      throw new ConflictException(
        'Patient profile already exists. Use PATCH to update.',
      );
    }

    const profile = this.patientProfileRepo.create({
      ...dto,
      userId,
    });

    return this.patientProfileRepo.save(profile);
  }

  async findOne(userId: string): Promise<PatientProfile> {
    const profile = await this.patientProfileRepo.findOne({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }

    return profile;
  }

  async update(
    userId: string,
    dto: UpdatePatientProfileDto,
  ): Promise<PatientProfile> {
    const profile = await this.findOne(userId);

    Object.assign(profile, dto);

    return this.patientProfileRepo.save(profile);
  }
}
