import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
  Post,
  Request,
  Res,
  ForbiddenException,
} from '@nestjs/common';
import { Response } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { PdfService } from '../pdf/pdf.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { StatusReservation } from 'src/common/enums/status-reservation.enum';

@Controller('reservations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReservationsController {
  constructor(
    private readonly reservationsService: ReservationsService,
    private readonly pdfService: PdfService,
  ) {}

  // Participant Endpoints

  @Post()
  @Roles(Role.PARTICIPANT)
  @UseGuards(RolesGuard)
  async createReservation(@Body() CreateReservationDto, @Request() req) {
    CreateReservationDto.userId = req.user.id;
    return this.reservationsService.create(CreateReservationDto);
  }

  @Get('my-reservations')
  @Roles(Role.PARTICIPANT)
  @UseGuards(RolesGuard)
  async getMyReservations(@Request() req) {
    return this.reservationsService.findByUser(req.user.id);
  }

  @Patch(':id/cancel')
  @Roles(Role.PARTICIPANT)
  @UseGuards(RolesGuard)
  async cancelReservation(@Param('id') id: string, @Request() req) {
    return this.reservationsService.updateStatus(
      id,
      StatusReservation.CANCELED,
    );
  }
  // Add to reservations.controller.ts
  @Get(':id/ticket')
  @Roles(Role.PARTICIPANT)
  async downloadTicket(@Param('id') id: string, @Request() req, @Res() res) {
    const reservation = await this.reservationsService.findOne(id);

    if (!reservation || reservation.userId.toString() !== req.user.id) {
      throw new ForbiddenException('Access denied');
    }

    const pdfBuffer = await this.pdfService.generateTicket(reservation);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="ticket-${id}.pdf"`,
    });

    res.send(pdfBuffer);
  }

  // Amin endpoints

  @Get('event/:eventId')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async getReservationsByEvent(@Param('eventId') eventId: string) {
    return this.reservationsService.findByEvent(eventId);
  }

  @Patch(':id/status')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async updateReservationStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.reservationsService.updateStatus(id, status);
  }
}
