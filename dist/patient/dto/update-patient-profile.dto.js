"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePatientProfileDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_patient_profile_dto_1 = require("./create-patient-profile.dto");
class UpdatePatientProfileDto extends (0, mapped_types_1.PartialType)(create_patient_profile_dto_1.CreatePatientProfileDto) {
}
exports.UpdatePatientProfileDto = UpdatePatientProfileDto;
//# sourceMappingURL=update-patient-profile.dto.js.map