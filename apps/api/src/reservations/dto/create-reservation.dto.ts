import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsString()
  eventId: string;

  @IsOptional()
  @IsString()
  userId?: string;
}
