import {
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
  Min,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Status } from '../../common/enums/status.enum';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'Capacity must be at least 1' })
  @Type(() => Number)
  capacity: number;

  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @IsOptional()
  @IsString()
  image?: string;
}
