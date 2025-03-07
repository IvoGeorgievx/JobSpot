import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/datasource/prisma.service';
import { AuthService } from './auth.service';
import { AppModule } from 'src/app.module';
import { SignUpCredentialsDto } from 'src/users/dto/user.dto';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findFirst: jest.fn(),
              create: jest.fn(),
            },
            companyProfile: {
              create: jest.fn(),
            },
            applicantProfile: {
              create: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);

    prisma.user.create = jest.fn();
    prisma.user.findFirst = jest.fn();
    prisma.applicantProfile.create = jest.fn();
    prisma.companyProfile.create = jest.fn();
    jwtService.signAsync = jest.fn();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signUp', () => {
    it('should sign up a new user', async () => {
      const userInfo: SignUpCredentialsDto = {
        email: 'test@email.bg',
        password: 'test123',
        role: UserRole.APPLICANT,
      };

      const createdUser = {
        id: 'some-uuid',
        email: userInfo.email,
        role: userInfo.role,
      };

      (prisma.user.create as jest.Mock).mockResolvedValue(createdUser);

      const result = await service.signUp(userInfo);

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          email: userInfo.email,
          password: expect.any(String) as string,
          role: userInfo.role,
        },
      });

      expect(result).toEqual(createdUser);
    });
  });

  it('should create profile when user signs up', async () => {
    const userInfo: SignUpCredentialsDto = {
      email: 'test@email.bg',
      password: 'test123',
      role: UserRole.APPLICANT,
    };

    const createdUser = {
      id: 'some-uuid',
      email: userInfo.email,
      role: userInfo.role,
    };

    (prisma.user.create as jest.Mock).mockResolvedValue(createdUser);

    await service.signUp(userInfo);

    expect(prisma.applicantProfile.create).toHaveBeenCalledWith({
      data: {
        userId: createdUser.id,
      },
    });
  });

  it('should throw error with invalid credentials', async () => {
    const userInfo: SignUpCredentialsDto = {
      email: 'badEmail.bg',
      password: 'test123',
      role: UserRole.APPLICANT,
    };

    await expect(service.signUp(userInfo)).rejects.toThrow();
  });

  it('should sign in a user', async () => {
    const signInCredentials = {
      email: 'test@mail.bg',
      password: 'pass123',
    };
    const hashedPassword = await bcrypt.hash(signInCredentials.password, 10);

    const mockUser = {
      id: 'some-uuid',
      email: signInCredentials.email,
      password: hashedPassword,
      role: UserRole.APPLICANT,
    };

    const mockJwtToken = 'mocked_jwt_token';

    jest.spyOn(prisma.user, 'findFirst').mockResolvedValue(mockUser);
    jest.spyOn(jwtService, 'signAsync').mockResolvedValue(mockJwtToken);

    const result = await service.signIn({
      email: signInCredentials.email,
      password: signInCredentials.password,
    });

    expect(prisma.user.findFirst).toHaveBeenCalledWith({
      where: {
        email: signInCredentials.email,
      },
    });

    expect(result).toEqual({ accessToken: mockJwtToken });
  });

  it('should throw error on invalid credentials', async () => {
    const mockUser = {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: UserRole.APPLICANT,
    };

    const credentials = {
      email: faker.internet.email(),
      password: mockUser.password,
    };

    (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);

    await expect(
      service.signIn({
        email: credentials.email,
        password: credentials.password,
      }),
    ).rejects.toThrow(BadRequestException);

    expect(prisma.user.findFirst).toHaveBeenCalledWith({
      where: { email: credentials.email },
    });
  });
});
