import { IsString, IsEnum, IsDate, IsNumber } from 'class-validator';
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
  capacity: number;

  @IsEnum(Status)
  status: Status;
}
