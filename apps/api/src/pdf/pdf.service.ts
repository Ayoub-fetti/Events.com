import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import { Reservation } from '../reservations/entities/reservations.entity';
import { Event } from '../events/entities/event.entities';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PdfService {
  async generateTicket(reservation: any): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50 });
      const buffers: Buffer[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      // Header
      doc.fontSize(24).fillColor('#2563eb').text('EVENT TICKET', 50, 50);
      doc
        .fontSize(12)
        .fillColor('#6b7280')
        .text(`Ticket ID: ${reservation._id}`, 50, 80);

      // Event Details
      doc
        .fontSize(18)
        .fillColor('#111827')
        .text(reservation.eventId.title, 50, 120);
      doc
        .fontSize(12)
        .fillColor('#6b7280')
        .text(
          `Date: ${new Date(reservation.eventId.date).toLocaleDateString()}`,
          50,
          150,
        )
        .text(`Location: ${reservation.eventId.location}`, 50, 170)
        .text(`Status: ${reservation.status.toUpperCase()}`, 50, 190);

      // Participant Details
      doc.fontSize(14).fillColor('#111827').text('Participant:', 50, 230);
      doc
        .fontSize(12)
        .fillColor('#6b7280')
        .text(reservation.userId.fullName, 50, 250);

      // QR Code placeholder
      doc.rect(400, 120, 100, 100).stroke();
      doc.fontSize(10).text('QR Code', 430, 165);

      doc.end();
    });
  }
}
