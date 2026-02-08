import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../src/auth/auth.service';
import { UsersService } from '../../src/users/users.service';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('register', () => {
    it('should register user and return token', async () => {
      const mockUser = {
        _id: '1',
        email: 'test@test.com',
        fullName: 'Test',
        role: 'user',
      };
      jest.spyOn(usersService, 'create').mockResolvedValue(mockUser as any);

      const result = await service.register({
        email: 'test@test.com',
        password: 'pass',
        fullName: 'Test',
        role: 'user',
      });

      expect(result.access_token).toBe('token');
      expect(result.user.email).toBe('test@test.com');
    });
  });

  describe('login', () => {
    it('should login and return token', async () => {
      const mockUser = {
        _id: '1',
        email: 'test@test.com',
        password: 'hashed',
        fullName: 'Test',
        role: 'user',
      };
      jest
        .spyOn(usersService, 'findByEmail')
        .mockResolvedValue(mockUser as any);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.login({
        email: 'test@test.com',
        password: 'pass',
      });

      expect(result.access_token).toBe('token');
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);
      await expect(
        service.login({ email: 'test@test.com', password: 'pass' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for wrong password', async () => {
      jest
        .spyOn(usersService, 'findByEmail')
        .mockResolvedValue({ password: 'hashed' } as any);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      await expect(
        service.login({ email: 'test@test.com', password: 'pass' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
