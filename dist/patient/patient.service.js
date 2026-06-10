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
exports.PatientService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const patient_profile_entity_1 = require("./entities/patient-profile.entity");
let PatientService = class PatientService {
    patientProfileRepo;
    constructor(patientProfileRepo) {
        this.patientProfileRepo = patientProfileRepo;
    }
    async create(userId, dto) {
        const existing = await this.patientProfileRepo.findOne({
            where: { userId },
        });
        if (existing) {
            throw new common_1.ConflictException('Patient profile already exists. Use PATCH to update.');
        }
        const profile = this.patientProfileRepo.create({
            ...dto,
            userId,
        });
        return this.patientProfileRepo.save(profile);
    }
    async findOne(userId) {
        const profile = await this.patientProfileRepo.findOne({
            where: { userId },
        });
        if (!profile) {
            throw new common_1.NotFoundException('Patient profile not found');
        }
        return profile;
    }
    async update(userId, dto) {
        const profile = await this.findOne(userId);
        Object.assign(profile, dto);
        return this.patientProfileRepo.save(profile);
    }
};
exports.PatientService = PatientService;
exports.PatientService = PatientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(patient_profile_entity_1.PatientProfile)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PatientService);
//# sourceMappingURL=patient.service.js.map