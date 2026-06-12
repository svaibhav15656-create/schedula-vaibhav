import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { SlotService } from './slot.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user-role.enum';

@Controller('doctor')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SlotController {
  constructor(private readonly slotService: SlotService) {}

  @Get(':doctorId/slots')
  @Roles(UserRole.PATIENT, UserRole.DOCTOR)
  getAvailableSlots(
    @Param('doctorId') doctorId: string,
    @Query('date') date: string,
    @Query('duration', new DefaultValuePipe(30), ParseIntPipe) duration: number,
  ) {
    return this.slotService.getAvailableSlots(doctorId, date, duration);
  }
}