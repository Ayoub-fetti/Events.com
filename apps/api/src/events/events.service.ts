import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update.event.dto';
import { Event, EventDocument } from './entities/event.entities';
import { Status } from 'src/common/enums/status.enum';
import { FilterEventsDto } from './dto/filter-events.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  async findAll(filters?: FilterEventsDto): Promise<Event[]> {
    const query: any = {};

    if (filters?.status) {
      query.status = filters.status;
    }

    if (filters?.dateFrom || filters?.dateTo) {
      query.date = {};
      if (filters.dateFrom) {
        query.date.$gte = new Date(filters.dateFrom);
      }
      if (filters.dateTo) {
        query.date.$lte = new Date(filters.dateTo);
      }
    }

    return this.eventModel.find(query).exec();
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.eventModel.findById(id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  async findPublished(filters?: FilterEventsDto): Promise<Event[]> {
    const query: any = { status: Status.PUBLISHED };

    if (filters?.dateFrom || filters?.dateTo) {
      query.date = {};
      if (filters.dateFrom) {
        query.date.$gte = new Date(filters.dateFrom);
      }
      if (filters.dateTo) {
        query.date.$lte = new Date(filters.dateTo);
      }
    }

    return this.eventModel.find(query).exec();
  }

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const createdEvent = new this.eventModel(createEventDto);
    return createdEvent.save();
  }
  async update(id: string, UpdateEventDto: UpdateEventDto): Promise<Event> {
    const updatedEvent = await this.eventModel.findByIdAndUpdate(
      id,
      UpdateEventDto,
      { new: true },
    );
    if (!updatedEvent) {
      throw new NotFoundException('Event not found');
    }
    return updatedEvent;
  }

  async publish(id: string): Promise<Event> {
    const event = await this.eventModel.findById(id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    if (event.status !== Status.DRAFT.toString()) {
      throw new BadGatewayException('Only draft events can be published');
    }
    const updatedEvent = await this.eventModel.findByIdAndUpdate(
      id,
      { status: Status.PUBLISHED },
      { new: true },
    );
    if (!updatedEvent) {
      throw new NotFoundException('Event not found');
    }
    return updatedEvent;
  }

  async cancel(id: string): Promise<Event> {
    const event = await this.eventModel.findById(id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    if (event.status === Status.CANCELED.toString()) {
      throw new BadGatewayException('Event is already canceled');
    }
    const updatedEvent = await this.eventModel.findByIdAndUpdate(
      id,
      { status: Status.CANCELED },
      { new: true },
    );
    if (!updatedEvent) {
      throw new NotFoundException('Event not found');
    }
    return updatedEvent;
  }

  async remove(id: string): Promise<void> {
    const result = await this.eventModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('Event not found');
    }
  }
}
