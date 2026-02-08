import {
  Controller,
  Get,
  Param,
  Res,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import type { Response } from 'express';
import { PdfService } from './pdf.service';
import { ReservationsService } from '../reservations/reservations.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('pdf')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PdfController {
  constructor(
    private readonly pdfService: PdfService,
    private readonly reservationsService: ReservationsService,
  ) {}

  @Get('ticket/:reservationId')
  @Roles(Role.PARTICIPANT)
  async downloadTicket(
    @Param('reservationId') reservationId: string,
    @Request() req,
    @Res() res: Response,
  ) {
    const reservation = await this.reservationsService.findOne(reservationId);

    if (!reservation || reservation.userId.toString() !== req.user.id) {
      throw new ForbiddenException('Access denied');
    }

    const pdfBuffer = await this.pdfService.generateTicket(reservation);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="ticket-${reservationId}.pdf"`,
      'Content-Length': pdfBuffer.length,
    });

    res.send(pdfBuffer);
  }
}
