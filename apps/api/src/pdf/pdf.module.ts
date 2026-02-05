import { Module, forwardRef } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { ReservationsModule } from '../reservations/reservations.module';

@Module({
  imports: [forwardRef(() => ReservationsModule)],
  controllers: [PdfController],
  providers: [PdfService],
  exports: [PdfService],
})
export class PdfModule {}
