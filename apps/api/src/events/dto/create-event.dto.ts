import { IsString, IsEnum, IsDate, IsNumber, Min } from 'class-validator';
import { Status } from 'src/common/enums/status.enum';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDate()
  date: Date;

  @IsString()
  location: string;

  @IsNumber()
  @Min(1, { message: 'Capacity must be at least 1' })
  capacity: number;

  @IsEnum(Status)
  status: Status;
}
