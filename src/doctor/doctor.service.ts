import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { DoctorProfile } from './entities/doctor-profile.entity';
import { QueryDoctorDto } from './dto/query-doctor.dto';
import { CreateDoctorProfileDto } from './dto/create-doctor-profile.dto';
import { UpdateDoctorProfileDto } from './dto/update-doctor-profile.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(DoctorProfile)
    private readonly doctorRepository: Repository<DoctorProfile>,
  ) {}

  async create(userId: string, dto: CreateDoctorProfileDto) {
    const existing = await this.doctorRepository.findOne({ where: { userId } });
    if (existing) {
      throw new ConflictException('Doctor profile already exists');
    }
    const profile = this.doctorRepository.create({ ...dto, userId });
    return this.doctorRepository.save(profile);
  }

  async findProfile(userId: string) {
    const doctor = await this.doctorRepository.findOne({ where: { userId } });
    if (!doctor) {
      throw new NotFoundException('Doctor profile not found');
    }
    return { data: doctor };
  }

  async update(userId: string, dto: UpdateDoctorProfileDto) {
    const doctor = await this.doctorRepository.findOne({ where: { userId } });
    if (!doctor) {
      throw new NotFoundException('Doctor profile not found');
    }
    Object.assign(doctor, dto);
    return this.doctorRepository.save(doctor);
  }

  async findAll(query: QueryDoctorDto) {
    const { specialization, search, page = 1, limit = 10, availability } = query;

    if (page < 1 || limit < 1) {
      throw new BadRequestException('Page and limit must be positive numbers');
    }

    const where: any = {};

    if (specialization) {
      where.specialization = ILike(`%${specialization}%`);
    }

    if (search) {
      where.fullName = ILike(`%${search}%`);
    }

    if (availability !== undefined) {
      where.availabilityHours = availability;
    }

    const [doctors, total] = await this.doctorRepository.findAndCount({
      where,
      select: ['id', 'fullName', 'specialization', 'experience', 'consultationFee', 'qualification', 'availabilityHours'],
      skip: (page - 1) * limit,
      take: limit,
    });

    if (doctors.length === 0) {
      return {
        message: 'No doctors found matching your criteria',
        data: [],
        total: 0,
        page,
        limit,
      };
    }

    return {
      data: doctors,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('Invalid doctor ID');
    }

    const doctor = await this.doctorRepository.findOne({
      where: { id },
    });

    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }

    return { data: doctor };
  }
}