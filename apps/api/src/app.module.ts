import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.modules';
import { ReservationsModule } from './reservations/reservations.module';
import { PdfModule } from './pdf/pdf.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/events-db',
    ),
    AuthModule,
    EventsModule,
    ReservationsModule,
    PdfModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
