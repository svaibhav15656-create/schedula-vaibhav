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
exports.AvailabilityController = void 0;
const common_1 = require("@nestjs/common");
const availability_service_1 = require("./availability.service");
const create_recurring_availability_dto_1 = require("./dto/create-recurring-availability.dto");
const create_custom_availability_dto_1 = require("./dto/create-custom-availability.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const user_role_enum_1 = require("../users/user-role.enum");
let AvailabilityController = class AvailabilityController {
    availabilityService;
    constructor(availabilityService) {
        this.availabilityService = availabilityService;
    }
    createRecurring(req, dto) {
        return this.availabilityService.createRecurring(req.user.sub ?? req.user.id, dto);
    }
    getRecurring(req) {
        return this.availabilityService.getRecurring(req.user.sub ?? req.user.id);
    }
    updateRecurring(req, id, dto) {
        return this.availabilityService.updateRecurring(req.user.sub ?? req.user.id, id, dto);
    }
    deleteRecurring(req, id) {
        return this.availabilityService.deleteRecurring(req.user.sub ?? req.user.id, id);
    }
    createOverride(req, dto) {
        return this.availabilityService.createOverride(req.user.sub ?? req.user.id, dto);
    }
    getByDate(req, date) {
        return this.availabilityService.getByDate(req.user.sub ?? req.user.id, date);
    }
};
exports.AvailabilityController = AvailabilityController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.DOCTOR),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_recurring_availability_dto_1.CreateRecurringAvailabilityDto]),
    __metadata("design:returntype", void 0)
], AvailabilityController.prototype, "createRecurring", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.DOCTOR),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AvailabilityController.prototype, "getRecurring", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.DOCTOR),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], AvailabilityController.prototype, "updateRecurring", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.DOCTOR),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AvailabilityController.prototype, "deleteRecurring", null);
__decorate([
    (0, common_1.Post)('override'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.DOCTOR),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_custom_availability_dto_1.CreateCustomAvailabilityDto]),
    __metadata("design:returntype", void 0)
], AvailabilityController.prototype, "createOverride", null);
__decorate([
    (0, common_1.Get)('date'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.DOCTOR, user_role_enum_1.UserRole.PATIENT),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AvailabilityController.prototype, "getByDate", null);
exports.AvailabilityController = AvailabilityController = __decorate([
    (0, common_1.Controller)('doctor/availability'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [availability_service_1.AvailabilityService])
], AvailabilityController);
//# sourceMappingURL=availability.controller.js.map