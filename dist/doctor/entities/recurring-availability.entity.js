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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecurringAvailability = void 0;
const typeorm_1 = require("typeorm");
const doctor_profile_entity_1 = require("./doctor-profile.entity");
let RecurringAvailability = class RecurringAvailability {
    id;
    doctor;
    doctorId;
    dayOfWeek;
    startTime;
    endTime;
    createdAt;
    updatedAt;
};
exports.RecurringAvailability = RecurringAvailability;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RecurringAvailability.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => doctor_profile_entity_1.DoctorProfile, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'doctorId' }),
    __metadata("design:type", doctor_profile_entity_1.DoctorProfile)
], RecurringAvailability.prototype, "doctor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RecurringAvailability.prototype, "doctorId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RecurringAvailability.prototype, "dayOfWeek", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], RecurringAvailability.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], RecurringAvailability.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], RecurringAvailability.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], RecurringAvailability.prototype, "updatedAt", void 0);
exports.RecurringAvailability = RecurringAvailability = __decorate([
    (0, typeorm_1.Entity)('recurring_availability')
], RecurringAvailability);
//# sourceMappingURL=recurring-availability.entity.js.map