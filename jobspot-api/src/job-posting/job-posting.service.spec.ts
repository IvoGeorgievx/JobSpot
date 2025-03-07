import { PrismaService } from './../datasource/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { JobPostingService } from './job-posting.service';
import { JwtService } from '@nestjs/jwt';
import { faker } from '@faker-js/faker/.';
import { JobType, UserRole } from '@prisma/client';

describe('JobPostingService', () => {
  let service: JobPostingService;
  let prisma: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobPostingService, PrismaService, JwtService],
    }).compile();

    service = module.get<JobPostingService>(JobPostingService);
    prisma = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);

    prisma.user.create = jest.fn();
    prisma.user.findFirst = jest.fn();
    prisma.jobPosting.create = jest.fn();
    prisma.companyProfile.create = jest.fn();
    prisma.companyProfile.findFirst = jest.fn();
    jwtService.signAsync = jest.fn();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a job posting', async () => {
    const createdUser = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: UserRole.COMPANY,
    };
    const mockedUser = {
      id: '123',
      email: createdUser.email,
      role: createdUser.role,
    };
    const mockJwtToken = 'jwtToken';

    const mockJobPosting = {
      title: faker.lorem.paragraph(),
      description: faker.lorem.paragraph(),
      fields: faker.lorem.words(),
      jobType: JobType.FULL_TIME,
      requirements: faker.lorem.sentences(),
      responsibilities: faker.lorem.sentences(),
      salaryMin: faker.number.int({ min: 80000, max: 100000 }).toString(),
      salaryMax: faker.number.int({ min: 120000, max: 150000 }).toString(),
    };

    const mockCompanyProfile = {
      id: 'companyId',
      userId: mockedUser.id,
    };

    (prisma.user.create as jest.Mock).mockResolvedValue(mockedUser);
    (jwtService.signAsync as jest.Mock).mockResolvedValue(mockJwtToken);
    (prisma.jobPosting.create as jest.Mock).mockResolvedValue({
      id: 'jobPostingId123',
      ...mockJobPosting,
      companyId: 'some company id',
    });

    (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockedUser);
    (prisma.companyProfile.create as jest.Mock).mockResolvedValue(
      mockCompanyProfile,
    );
    (prisma.companyProfile.findFirst as jest.Mock).mockResolvedValue(
      mockCompanyProfile,
    );

    const result = await service.createJobPosting(
      mockedUser.id,
      mockJobPosting,
    );

    expect(result).toHaveProperty('id', 'jobPostingId123');

    expect(result).toEqual({
      id: 'jobPostingId123',
      ...mockJobPosting,
      companyId: 'some company id',
    });
  });
});
