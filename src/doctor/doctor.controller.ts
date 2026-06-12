import { Controller, Get, Post, Patch, Param, Query, Body, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { QueryDoctorDto } from './dto/query-doctor.dto';
import { CreateDoctorProfileDto } from './dto/create-doctor-profile.dto';
import { UpdateDoctorProfileDto } from './dto/update-doctor-profile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user-role.enum';

@Controller('doctor')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('onboard')
  @Roles(UserRole.DOCTOR)
  @HttpCode(HttpStatus.CREATED)
  create(@Req() req: any, @Body() dto: CreateDoctorProfileDto) {
    return this.doctorService.create(req.user.sub ?? req.user.id, dto);
  }

  @Get('me')
  @Roles(UserRole.DOCTOR)
  getProfile(@Req() req: any) {
    return this.doctorService.findProfile(req.user.sub ?? req.user.id);
  }

  @Patch('me')
  @Roles(UserRole.DOCTOR)
  update(@Req() req: any, @Body() dto: UpdateDoctorProfileDto) {
    return this.doctorService.update(req.user.sub ?? req.user.id, dto);
  }

  @Get()
  @Roles(UserRole.PATIENT, UserRole.DOCTOR)
  findAll(@Query() query: QueryDoctorDto) {
    return this.doctorService.findAll(query);
  }

  @Get(':id')
  @Roles(UserRole.PATIENT, UserRole.DOCTOR)
  findById(@Param('id') id: string) {
    return this.doctorService.findOne(id);
  }
}