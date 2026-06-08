import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientProfileDto } from './dto/create-patient-profile.dto';
import { UpdatePatientProfileDto } from './dto/update-patient-profile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user-role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.PATIENT)
@Controller('patient/profile')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Req() req: any, @Body() dto: CreatePatientProfileDto) {
    return this.patientService.create(req.user.sub ?? req.user.id, dto);
  }

  @Get()
  getProfile(@Req() req: any) {
    return this.patientService.findOne(req.user.sub ?? req.user.id);
  }

  @Patch()
  update(@Req() req: any, @Body() dto: UpdatePatientProfileDto) {
    return this.patientService.update(req.user.sub ?? req.user.id, dto);
  }
}
