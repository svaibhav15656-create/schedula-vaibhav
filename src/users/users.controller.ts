import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller()
export class UsersController {
  @Get('doctor/profile')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles('DOCTOR')
  doctorProfile() {
    return {
      message: 'Doctor Profile Accessed',
    };
  }

  @Get('patient/profile')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles('PATIENT')
  patientProfile() {
    return {
      message: 'Patient Profile Accessed',
    };
  }
}