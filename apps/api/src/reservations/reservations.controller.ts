import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('reservations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get('event/:eventId')
  @Roles(Role.ADMIN)
  async getReservationsByEvent(@Param('eventId') eventId: string) {
    return this.reservationsService.findByEvent(eventId);
  }

  @Patch(':id/status')
  @Roles(Role.ADMIN)
  async updateReservationStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.reservationsService.updateStatus(id, status);
  }
}
