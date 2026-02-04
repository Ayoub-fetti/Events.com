import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsString()
  eventId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
