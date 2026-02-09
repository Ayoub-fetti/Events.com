import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ReservationsService } from '../../src/reservations/reservations.service';
import { Reservation } from '../../src/reservations/entities/reservations.entity';
import { Event } from '../../src/events/entities/event.entities';
import { User } from '../../src/users/entities/user.entity';
import { BadRequestException } from '@nestjs/common';

describe('ReservationsService', () => {
  let service: ReservationsService;
  let mockReservationModel: any;
  let mockEventModel: any;
  let mockUserModel: any;

  beforeEach(async () => {
    mockReservationModel = {
      countDocuments: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
    };

    mockEventModel = {
      findById: jest.fn(),
    };

    mockUserModel = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: getModelToken(Reservation.name),
          useValue: mockReservationModel,
        },
        { provide: getModelToken(Event.name), useValue: mockEventModel },
        { provide: getModelToken(User.name), useValue: mockUserModel },
      ],
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);
  });

  describe('create', () => {
    it('should throw error if userId missing', async () => {
      await expect(service.create({ eventId: '1' } as any)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw error if event not published', async () => {
      mockEventModel.findById.mockResolvedValue({ status: 'draft' });
      await expect(
        service.create({ eventId: '1', userId: '1' } as any),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw error for past events', async () => {
      mockEventModel.findById.mockResolvedValue({
        status: 'published',
        date: new Date('2020-01-01'),
      });
      await expect(
        service.create({ eventId: '1', userId: '1' } as any),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw error if event full', async () => {
      mockEventModel.findById.mockResolvedValue({
        status: 'published',
        date: new Date('2030-01-01'),
        capacity: 10,
      });
      mockReservationModel.countDocuments.mockResolvedValue(10);
      await expect(
        service.create({ eventId: '1', userId: '1' } as any),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw error if user already reserved', async () => {
      mockEventModel.findById.mockResolvedValue({
        status: 'published',
        date: new Date('2030-01-01'),
        capacity: 10,
      });
      mockReservationModel.countDocuments.mockResolvedValue(5);
      mockReservationModel.findOne.mockResolvedValue({ userId: '1' });
      await expect(
        service.create({ eventId: '1', userId: '1' } as any),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
