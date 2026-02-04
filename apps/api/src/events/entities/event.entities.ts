import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Status } from 'src/common/enums/status.enum';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  location: string;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ required: true })
  capacity: number;

  @Prop({ enum: Status, default: Status.DRAFT })
  status: string;
}
export const EventSchema = SchemaFactory.createForClass(Event);
