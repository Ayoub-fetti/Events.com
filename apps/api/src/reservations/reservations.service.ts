import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Reservation,
  ReservationDocument,
} from './entities/reservations.entity';
import { Event, EventDocument } from '../events/entities/event.entities';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    await this.validateReservation(
      createReservationDto.eventId,
      createReservationDto.userId,
    );

    const reservation = new this.reservationModel(createReservationDto);
    return reservation.save();
  }

  private async validateReservation(
    eventId: string,
    userId: string,
  ): Promise<void> {
    const event = await this.eventModel.findById(eventId);
    if (!event || event.status !== 'published') {
      throw new BadRequestException('Event not available for reservation');
    }

    if (new Date(event.date) < new Date()) {
      throw new BadRequestException('Cannot reserve past events');
    }

    const reservationCount = await this.reservationModel.countDocuments({
      eventId,
      status: { $in: ['pending', 'confirmed'] },
    });
    if (reservationCount >= event.capacity) {
      throw new BadRequestException('Event is full');
    }

    const existingReservation = await this.reservationModel.findOne({
      eventId,
      userId,
      status: { $ne: 'canceled' },
    });
    if (existingReservation) {
      throw new BadRequestException(
        'User already has a reservation for this event',
      );
    }
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationModel
      .find()
      .populate('eventId')
      .populate('userId')
      .exec();
  }

  async findOne(id: string): Promise<Reservation> {
    return this.reservationModel
      .findById(id)
      .populate('eventId')
      .populate('userId')
      .exec();
  }

  async updateStatus(id: string, status: string): Promise<Reservation> {
    return this.reservationModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
  }
}
