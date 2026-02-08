import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';
import { EventsService } from '../../src/events/events.service';

describe('Complete Flow E2E', () => {
  let app: INestApplication;
  let connection: Connection;
  let eventsService: EventsService;
  let adminToken: string;
  let userToken: string;
  let eventId: string;
  let reservationId: string;

  beforeAll(async () => {
    process.env.MONGODB_URI = 'mongodb://localhost:27017/events-db-test';
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();

    connection = moduleFixture.get(getConnectionToken());
    eventsService = moduleFixture.get(EventsService);
    await connection.dropDatabase();
  });

  afterAll(async () => {
    await connection.close();
    await app.close();
  });

  describe('Authentication', () => {
    it('should register admin', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          email: 'admin@test.com',
          password: 'Admin123!',
          fullName: 'Admin User',
          role: 'admin',
        })
        .expect(201);

      adminToken = res.body.access_token;
    });

    it('should register participant', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          email: 'user@test.com',
          password: 'User123!',
          fullName: 'Test User',
          role: 'participant',
        })
        .expect(201);

      userToken = res.body.access_token;
    });
  });

  describe('Event Management (Admin)', () => {
    it('should create event as admin', async () => {
      const event = await eventsService.create({
        title: 'Tech Conference',
        description: 'Annual tech event',
        location: 'Paris',
        date: new Date('2026-12-31'),
        capacity: 100,
      });

      eventId = event._id.toString();
      expect(eventId).toBeDefined();
    });

    it('should publish event as admin', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/api/v1/events/${eventId}/publish`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body.status).toBe('published');
    });

    it('should get published events', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/events/published')
        .expect(200);

      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe('Reservation Flow (Participant)', () => {
    it('should create reservation', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/reservations')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId });

      if (res.status === 201) {
        reservationId = res.body._id;
      }

      expect(res.status).toBe(201);
    });

    it('should fail duplicate reservation', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/reservations')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId })
        .expect(400);
    });

    it('should get my reservations', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/reservations/my-reservations')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe('Admin Management', () => {
    it('should get all reservations', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/reservations')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body.length).toBeGreaterThan(0);
    });

    it('should update reservation status', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/api/v1/reservations/${reservationId}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'confirmed' })
        .expect(200);

      expect(res.body.status).toBe('confirmed');
    });

    it('should cancel event', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/api/v1/events/${eventId}/cancel`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body.status).toBe('canceled');
    });
  });
});
