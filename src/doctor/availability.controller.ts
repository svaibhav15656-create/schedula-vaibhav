import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { CreateRecurringAvailabilityDto } from './dto/create-recurring-availability.dto';
import { CreateCustomAvailabilityDto } from './dto/create-custom-availability.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user-role.enum';

@Controller('doctor/availability')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Post()
  @Roles(UserRole.DOCTOR)
  createRecurring(@Req() req: any, @Body() dto: CreateRecurringAvailabilityDto) {
    return this.availabilityService.createRecurring(req.user.sub ?? req.user.id, dto);
  }

  @Get()
  @Roles(UserRole.DOCTOR)
  getRecurring(@Req() req: any) {
    return this.availabilityService.getRecurring(req.user.sub ?? req.user.id);
  }

  @Patch(':id')
  @Roles(UserRole.DOCTOR)
  updateRecurring(@Req() req: any, @Param('id') id: string, @Body() dto: Partial<CreateRecurringAvailabilityDto>) {
    return this.availabilityService.updateRecurring(req.user.sub ?? req.user.id, id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.DOCTOR)
  deleteRecurring(@Req() req: any, @Param('id') id: string) {
    return this.availabilityService.deleteRecurring(req.user.sub ?? req.user.id, id);
  }

  @Post('override')
  @Roles(UserRole.DOCTOR)
  createOverride(@Req() req: any, @Body() dto: CreateCustomAvailabilityDto) {
    return this.availabilityService.createOverride(req.user.sub ?? req.user.id, dto);
  }

  @Get('date')
  @Roles(UserRole.DOCTOR, UserRole.PATIENT)
  getByDate(@Req() req: any, @Query('date') date: string) {
    return this.availabilityService.getByDate(req.user.sub ?? req.user.id, date);
  }
}