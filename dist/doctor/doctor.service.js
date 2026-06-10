"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const doctor_profile_entity_1 = require("./entities/doctor-profile.entity");
let DoctorService = class DoctorService {
    doctorRepository;
    constructor(doctorRepository) {
        this.doctorRepository = doctorRepository;
    }
    async create(userId, dto) {
        const existing = await this.doctorRepository.findOne({ where: { userId } });
        if (existing) {
            throw new common_1.ConflictException('Doctor profile already exists');
        }
        const profile = this.doctorRepository.create({ ...dto, userId });
        return this.doctorRepository.save(profile);
    }
    async findProfile(userId) {
        const doctor = await this.doctorRepository.findOne({ where: { userId } });
        if (!doctor) {
            throw new common_1.NotFoundException('Doctor profile not found');
        }
        return { data: doctor };
    }
    async update(userId, dto) {
        const doctor = await this.doctorRepository.findOne({ where: { userId } });
        if (!doctor) {
            throw new common_1.NotFoundException('Doctor profile not found');
        }
        Object.assign(doctor, dto);
        return this.doctorRepository.save(doctor);
    }
    async findAll(query) {
        const { specialization, search, page = 1, limit = 10, availability } = query;
        if (page < 1 || limit < 1) {
            throw new common_1.BadRequestException('Page and limit must be positive numbers');
        }
        const where = {};
        if (specialization) {
            where.specialization = (0, typeorm_2.ILike)(`%${specialization}%`);
        }
        if (search) {
            where.fullName = (0, typeorm_2.ILike)(`%${search}%`);
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
    async findOne(id) {
        if (!id) {
            throw new common_1.BadRequestException('Invalid doctor ID');
        }
        const doctor = await this.doctorRepository.findOne({
            where: { id },
        });
        if (!doctor) {
            throw new common_1.NotFoundException(`Doctor with ID ${id} not found`);
        }
        return { data: doctor };
    }
};
exports.DoctorService = DoctorService;
exports.DoctorService = DoctorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(doctor_profile_entity_1.DoctorProfile)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DoctorService);
//# sourceMappingURL=doctor.service.js.map