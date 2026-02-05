import {
  IsString,
  IsEnum,
  IsNumber,
  Min,
  IsDate,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Status } from 'src/common/enums/status.enum';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsString()
  location: string;

  @IsNumber()
  @Min(1, { message: 'Capacity must be at least 1' })
  capacity: number;

  @IsEnum(Status)
  status: Status;

  @IsOptional()
  @IsString()
  image?: string;
}
