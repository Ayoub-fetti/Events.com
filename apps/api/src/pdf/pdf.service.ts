import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import { Reservation } from '../reservations/entities/reservations.entity';
import { Event } from '../events/entities/event.entities';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PdfService {
  async generateTicket(reservation: any): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        margin: 0,
        size: 'A4',
      });
      const buffers: Buffer[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      // Colors
      const colors = {
        primary: '#06B6D4', // Cyan
        secondary: '#2563EB', // Blue
        dark: '#0B0F1A',
        darkGray: '#111827',
        mediumGray: '#6B7280',
        lightGray: '#D1D5DB',
        success: '#10B981',
        white: '#FFFFFF',
      };

      // Helper function to draw gradient background
      const drawGradientHeader = () => {
        // Top gradient section
        doc.rect(0, 0, 595, 200).fill(colors.primary);

        // Add decorative shapes
        doc.circle(500, -50, 150).fill(colors.secondary);
        doc.circle(100, 150, 100).fill(colors.secondary);

        // Overlay with semi-transparent rectangle for blend effect
        doc.rect(0, 0, 595, 200).fillOpacity(0.9).fill(colors.dark);
        doc.fillOpacity(1); // Reset opacity
      };

      // Draw gradient header
      drawGradientHeader();

      // Header Section
      doc
        .fontSize(32)
        .fillColor(colors.primary)
        .font('Helvetica-Bold')
        .text('EVENT TICKET', 50, 50, { align: 'left' });

      doc
        .fontSize(10)
        .fillColor(colors.lightGray)
        .font('Helvetica')
        .text('Your official pass to an amazing experience', 50, 90);

      // Ticket ID with styling
      doc.fontSize(9).fillColor(colors.mediumGray).text('TICKET ID', 50, 130);

      doc
        .fontSize(11)
        .fillColor(colors.white)
        .font('Helvetica-Bold')
        .text(
          `#${reservation._id.toString().slice(-8).toUpperCase()}`,
          50,
          145,
        );

      // Status badge (top right)
      const statusColors: { [key: string]: string } = {
        confirmed: colors.success,
        pending: '#F59E0B',
        refused: '#EF4444',
        cancelled: colors.mediumGray,
      };

      const statusColor = statusColors[reservation.status] || colors.mediumGray;
      const statusX = 450;
      const statusY = 50;

      doc
        .roundedRect(statusX, statusY, 95, 30, 5)
        .fillAndStroke(statusColor, statusColor);

      doc
        .fontSize(10)
        .fillColor(colors.white)
        .font('Helvetica-Bold')
        .text(reservation.status.toUpperCase(), statusX, statusY + 9, {
          width: 95,
          align: 'center',
        });

      // White content area
      doc.rect(0, 200, 595, 642).fill(colors.white);

      // Event Details Card
      const cardY = 240;

      // Card shadow effect
      doc
        .roundedRect(45, cardY - 5, 505, 155, 10)
        .fillOpacity(0.05)
        .fill(colors.dark);

      doc.fillOpacity(1);

      // Card background
      doc
        .roundedRect(40, cardY, 505, 155, 10)
        .lineWidth(1)
        .strokeOpacity(0.1)
        .stroke(colors.mediumGray)
        .fillOpacity(1)
        .fill(colors.white);

      // Event icon
      doc
        .circle(70, cardY + 35, 20)
        .fillOpacity(0.1)
        .fill(colors.primary);

      doc.fillOpacity(1);

      // Calendar icon (simplified)
      doc
        .fontSize(20)
        .fillColor(colors.primary)
        .text('📅', 60, cardY + 22);

      // Event Title
      doc
        .fontSize(20)
        .fillColor(colors.darkGray)
        .font('Helvetica-Bold')
        .text(reservation.eventId.title, 110, cardY + 25, {
          width: 420,
        });

      // Event details with icons
      const detailsY = cardY + 70;
      const lineHeight = 25;

      // Date
      doc
        .fontSize(10)
        .fillColor(colors.mediumGray)
        .font('Helvetica')
        .text('🗓', 70, detailsY);

      doc
        .fontSize(11)
        .fillColor(colors.darkGray)
        .font('Helvetica')
        .text(
          new Date(reservation.eventId.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          95,
          detailsY,
        );

      // Time
      doc
        .fontSize(10)
        .fillColor(colors.mediumGray)
        .text('🕐', 70, detailsY + lineHeight);

      doc
        .fontSize(11)
        .fillColor(colors.darkGray)
        .text(
          new Date(reservation.eventId.date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          95,
          detailsY + lineHeight,
        );

      // Location
      doc
        .fontSize(10)
        .fillColor(colors.mediumGray)
        .text('📍', 70, detailsY + lineHeight * 2);

      doc
        .fontSize(11)
        .fillColor(colors.darkGray)
        .text(reservation.eventId.location, 95, detailsY + lineHeight * 2, {
          width: 430,
        });

      // Participant Details Card
      const participantCardY = 430;

      doc
        .roundedRect(40, participantCardY, 320, 100, 10)
        .lineWidth(1)
        .strokeOpacity(0.1)
        .stroke(colors.mediumGray)
        .fillOpacity(1)
        .fill(colors.white);

      doc
        .fontSize(12)
        .fillColor(colors.mediumGray)
        .font('Helvetica-Bold')
        .text('PARTICIPANT INFORMATION', 60, participantCardY + 20);

      doc
        .fontSize(10)
        .fillColor(colors.mediumGray)
        .font('Helvetica')
        .text('Name', 60, participantCardY + 45);

      doc
        .fontSize(14)
        .fillColor(colors.darkGray)
        .font('Helvetica-Bold')
        .text(reservation.userId.fullName, 60, participantCardY + 60);

      // QR Code / Barcode Section
      const qrX = 380;
      const qrY = participantCardY;

      doc
        .roundedRect(qrX, qrY, 165, 100, 10)
        .lineWidth(1)
        .strokeOpacity(0.1)
        .stroke(colors.mediumGray)
        .fill(colors.white);

      // QR Code placeholder with grid pattern
      const qrSize = 70;
      const qrPosX = qrX + 47.5;
      const qrPosY = qrY + 15;

      // QR background
      doc.rect(qrPosX, qrPosY, qrSize, qrSize).fill(colors.lightGray);

      // QR grid pattern (simplified)
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          if ((i + j) % 2 === 0) {
            doc
              .rect(qrPosX + i * 10, qrPosY + j * 10, 10, 10)
              .fill(colors.dark);
          }
        }
      }

      doc
        .fontSize(8)
        .fillColor(colors.mediumGray)
        .font('Helvetica')
        .text('Scan for verification', qrX + 10, qrPosY + qrSize + 8, {
          width: 145,
          align: 'center',
        });

      // Important Information Section
      const infoY = 560;

      doc
        .fontSize(11)
        .fillColor(colors.mediumGray)
        .font('Helvetica-Bold')
        .text('IMPORTANT INFORMATION', 40, infoY);

      const infoText = [
        '• Please arrive at least 15 minutes before the event start time',
        '• This ticket is non-transferable and must be presented at the entrance',
        '• Bring a valid photo ID for verification',
        '• Check event updates at our website or contact organizers',
      ];

      doc
        .fontSize(9)
        .fillColor(colors.mediumGray)
        .font('Helvetica')
        .list(infoText, 40, infoY + 20, {
          bulletRadius: 2,
          textIndent: 15,
          lineGap: 5,
        });

      // Footer Section
      const footerY = 750;

      // Footer gradient
      doc.rect(0, footerY, 595, 92).fill(colors.darkGray);

      // Decorative line
      doc
        .moveTo(40, footerY + 15)
        .lineTo(555, footerY + 15)
        .lineWidth(2)
        .strokeOpacity(0.3)
        .stroke(colors.primary);

      doc.strokeOpacity(1);

      // Footer text
      doc
        .fontSize(9)
        .fillColor(colors.mediumGray)
        .font('Helvetica')
        .text(
          'Events.com - Your Premier Event Management Platform',
          40,
          footerY + 35,
          { align: 'center', width: 515 },
        );

      doc
        .fontSize(8)
        .fillColor(colors.mediumGray)
        .text(
          'For support: support@events.com | www.events.com',
          40,
          footerY + 50,
          { align: 'center', width: 515 },
        );

      doc
        .fontSize(7)
        .fillColor(colors.mediumGray)
        .text(
          `Generated on ${new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })} at ${new Date().toLocaleTimeString('en-US')}`,
          40,
          footerY + 68,
          { align: 'center', width: 515 },
        );

      doc.end();
    });
  }
}
