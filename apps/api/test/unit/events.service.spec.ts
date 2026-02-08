import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { EventsService } from '../../src/events/events.service';
import { Event } from '../../src/events/entities/event.entities';
import { NotFoundException, BadGatewayException } from '@nestjs/common';
import { Status } from '../../src/common/enums/status.enum';

describe('EventsService', () => {
  let service: EventsService;
  let mockEventModel: any;

  beforeEach(async () => {
    mockEventModel = {
      find: jest.fn().mockReturnThis(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
      exec: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        { provide: getModelToken(Event.name), useValue: mockEventModel },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  describe('findOne', () => {
    it('should return an event', async () => {
      const mockEvent = { _id: '1', title: 'Test Event' };
      mockEventModel.findById.mockResolvedValue(mockEvent);

      const result = await service.findOne('1');
      expect(result).toEqual(mockEvent);
    });

    it('should throw NotFoundException', async () => {
      mockEventModel.findById.mockResolvedValue(null);
      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('publish', () => {
    it('should publish a draft event', async () => {
      const mockEvent = { _id: '1', status: Status.DRAFT };
      mockEventModel.findById.mockResolvedValue(mockEvent);
      mockEventModel.findByIdAndUpdate.mockResolvedValue({
        ...mockEvent,
        status: Status.PUBLISHED,
      });

      const result = await service.publish('1');
      expect(result.status).toBe(Status.PUBLISHED);
    });

    it('should throw error for non-draft event', async () => {
      mockEventModel.findById.mockResolvedValue({ status: Status.PUBLISHED });
      await expect(service.publish('1')).rejects.toThrow(BadGatewayException);
    });
  });

  describe('cancel', () => {
    it('should cancel an event', async () => {
      const mockEvent = { _id: '1', status: Status.PUBLISHED };
      mockEventModel.findById.mockResolvedValue(mockEvent);
      mockEventModel.findByIdAndUpdate.mockResolvedValue({
        ...mockEvent,
        status: Status.CANCELED,
      });

      const result = await service.cancel('1');
      expect(result.status).toBe(Status.CANCELED);
    });

    it('should throw error if already canceled', async () => {
      mockEventModel.findById.mockResolvedValue({ status: Status.CANCELED });
      await expect(service.cancel('1')).rejects.toThrow(BadGatewayException);
    });
  });
});
