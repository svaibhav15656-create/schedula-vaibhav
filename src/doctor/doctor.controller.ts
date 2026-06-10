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
import { DoctorService } from './doctor.service';
import { CreateDoctorProfileDto } from './dto/create-doctor-profile.dto';
import { UpdateDoctorProfileDto } from './dto/update-doctor-profile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user-role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.DOCTOR)
@Controller('doctor/profile')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Req() req: any, @Body() dto: CreateDoctorProfileDto) {
    return this.doctorService.create(req.user.sub ?? req.user.id, dto);
  }

  @Get()
  getProfile(@Req() req: any) {
    return this.doctorService.findOne(req.user.sub ?? req.user.id);
  }

  @Patch()
  update(@Req() req: any, @Body() dto: UpdateDoctorProfileDto) {
    return this.doctorService.update(req.user.sub ?? req.user.id, dto);
  }
}
