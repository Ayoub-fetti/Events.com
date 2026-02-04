import {
  IsString,
  IsEnum,
  IsDate,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { Status } from 'src/common/enums/status.enum';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsDate()
  date: Date;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'Capacity must be at least 1' })
  capacity: number;

  @IsOptional()
  @IsEnum(Status)
  status: Status;
}
