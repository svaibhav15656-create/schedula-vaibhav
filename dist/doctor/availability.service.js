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
exports.AvailabilityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const recurring_availability_entity_1 = require("./entities/recurring-availability.entity");
const custom_availability_entity_1 = require("./entities/custom-availability.entity");
let AvailabilityService = class AvailabilityService {
    recurringRepo;
    customRepo;
    constructor(recurringRepo, customRepo) {
        this.recurringRepo = recurringRepo;
        this.customRepo = customRepo;
    }
    isOverlapping(start1, end1, start2, end2) {
        return start1 < end2 && start2 < end1;
    }
    isValidTimeRange(start, end) {
        return start < end;
    }
    async createRecurring(doctorId, dto) {
        if (!this.isValidTimeRange(dto.startTime, dto.endTime)) {
            throw new common_1.BadRequestException('End time must be after start time');
        }
        const existing = await this.recurringRepo.find({
            where: { doctorId, dayOfWeek: dto.dayOfWeek },
        });
        for (const slot of existing) {
            if (this.isOverlapping(dto.startTime, dto.endTime, slot.startTime, slot.endTime)) {
                throw new common_1.BadRequestException('Time slot overlaps with existing availability');
            }
        }
        const duplicate = existing.find((s) => s.startTime === dto.startTime && s.endTime === dto.endTime);
        if (duplicate) {
            throw new common_1.BadRequestException('Duplicate availability entry');
        }
        const availability = this.recurringRepo.create({ ...dto, doctorId });
        return this.recurringRepo.save(availability);
    }
    async getRecurring(doctorId) {
        const slots = await this.recurringRepo.find({ where: { doctorId } });
        if (slots.length === 0) {
            return { message: 'No recurring availability found', data: [] };
        }
        return { data: slots };
    }
    async updateRecurring(doctorId, id, dto) {
        const slot = await this.recurringRepo.findOne({ where: { id, doctorId } });
        if (!slot) {
            throw new common_1.NotFoundException('Availability slot not found');
        }
        const updatedStart = dto.startTime || slot.startTime;
        const updatedEnd = dto.endTime || slot.endTime;
        if (!this.isValidTimeRange(updatedStart, updatedEnd)) {
            throw new common_1.BadRequestException('End time must be after start time');
        }
        Object.assign(slot, dto);
        return this.recurringRepo.save(slot);
    }
    async deleteRecurring(doctorId, id) {
        const slot = await this.recurringRepo.findOne({ where: { id, doctorId } });
        if (!slot) {
            throw new common_1.NotFoundException('Availability slot not found');
        }
        await this.recurringRepo.remove(slot);
        return { message: 'Availability slot deleted successfully' };
    }
    async createOverride(doctorId, dto) {
        if (!this.isValidTimeRange(dto.startTime, dto.endTime)) {
            throw new common_1.BadRequestException('End time must be after start time');
        }
        const existing = await this.customRepo.find({
            where: { doctorId, date: dto.date },
        });
        for (const slot of existing) {
            if (this.isOverlapping(dto.startTime, dto.endTime, slot.startTime, slot.endTime)) {
                throw new common_1.BadRequestException('Time slot overlaps with existing override');
            }
        }
        const override = this.customRepo.create({ ...dto, doctorId });
        return this.customRepo.save(override);
    }
    async getByDate(doctorId, date) {
        if (!date) {
            throw new common_1.BadRequestException('Date is required');
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
};
exports.AvailabilityService = AvailabilityService;
exports.AvailabilityService = AvailabilityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(recurring_availability_entity_1.RecurringAvailability)),
    __param(1, (0, typeorm_1.InjectRepository)(custom_availability_entity_1.CustomAvailability)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AvailabilityService);
//# sourceMappingURL=availability.service.js.map