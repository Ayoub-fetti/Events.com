import { IsOptional, IsEnum, IsDateString } from 'class-validator';
import { Status } from '../../common/enums/status.enum';

export class FilterEventsDto {
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsDateString()
  dateFrom?: string;

  @IsOptional()
  @IsDateString()
  dateTo?: string;
}
