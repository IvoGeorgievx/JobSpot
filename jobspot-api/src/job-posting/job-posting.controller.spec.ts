import { Test, TestingModule } from '@nestjs/testing';
import { JobPostingController } from './job-posting.controller';
import { JobPostingService } from './job-posting.service';
import { PrismaService } from 'src/datasource/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('JobPostingController', () => {
  let controller: JobPostingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobPostingController],
      providers: [JobPostingService, PrismaService, JwtService],
    }).compile();

    controller = module.get<JobPostingController>(JobPostingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
