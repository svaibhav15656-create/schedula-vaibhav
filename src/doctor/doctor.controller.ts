import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { QueryDoctorDto } from './dto/query-doctor.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('doctor')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  @Roles('patient', 'doctor')
  findAll(@Query() query: QueryDoctorDto) {
    return this.doctorService.findAll(query);
  }

  @Get(':id')
  @Roles('patient', 'doctor')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(id);
  }
}