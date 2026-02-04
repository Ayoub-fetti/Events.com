import {
  Controller,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Patch,
  Get,
  UseGuards,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update.event.dto';
import { FilterEventsDto } from './dto/filter-events.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAll(@Query() filters: FilterEventsDto) {
    return this.eventsService.findAll(filters);
  }

  @Get('published')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PARTICIPANT)
  findPublished(@Query() filters: FilterEventsDto) {
    return this.eventsService.findPublished(filters);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() UpdateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, UpdateEventDto);
  }

  @Patch(':id/publish')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  publish(@Param('id') id: string) {
    return this.eventsService.publish(id);
  }

  @Patch(':id/cancel')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  cancel(@Param('id') id: string) {
    return this.eventsService.cancel(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
