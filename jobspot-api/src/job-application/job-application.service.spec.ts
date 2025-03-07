import { Test, TestingModule } from '@nestjs/testing';
import { JobApplicationService } from './job-application.service';
import { PrismaService } from 'src/datasource/prisma.service';

describe('JobApplicationService', () => {
  let service: JobApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobApplicationService, PrismaService],
    }).compile();

    service = module.get<JobApplicationService>(JobApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
