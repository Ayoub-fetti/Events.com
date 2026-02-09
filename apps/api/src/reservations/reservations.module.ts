import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { Reservation, ReservationSchema } from './entities/reservations.entity';
import { Event, EventSchema } from '../events/entities/event.entities';
import { PdfService } from '../pdf/pdf.service';
import { User, UserSchema } from 'src/users/entities/user.entity';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
      { name: Event.name, schema: EventSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, PdfService],
  exports: [ReservationsService],
})
export class ReservationsModule {}
