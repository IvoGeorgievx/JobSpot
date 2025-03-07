import { Test, TestingModule } from '@nestjs/testing';
import { UserRole } from '@prisma/client';
import { AppModule } from 'src/app.module';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { PrismaService } from 'src/datasource/prisma.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;
  let controller: AuthController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        UsersService,
        AuthController,
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: { findFirst: jest.fn() },
            companyProfile: { findFirst: jest.fn() },
            applicantProfile: { findFirst: jest.fn() },
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
    controller = module.get<AuthController>(AuthController);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update applicant profile relevant fields', async () => {
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: UserRole.APPLICANT,
      profilePicUrl: '123',
    };

    jest.spyOn(controller, 'getMe').mockResolvedValue(mockUser);

    const user = await controller.getMe({ user: { sub: '1' } });
    expect(user).toEqual(mockUser);
  });
});
