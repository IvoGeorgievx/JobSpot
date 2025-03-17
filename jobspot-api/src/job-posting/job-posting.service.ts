import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/datasource/prisma.service';
import {
  JobPostingDto,
  PaginatedJobPostingResponseDto,
} from './dto/job-posting.dto';
import { JobField, JobPosting } from '@prisma/client';
import { sub } from 'date-fns';

@Injectable()
export class JobPostingService {
  constructor(private readonly prisma: PrismaService) {}
  async createJobPosting(
    userId: string,
    data: JobPostingDto,
  ): Promise<JobPosting> {
    const companyProfileId = await this.findUserAndRelatedProfile(userId);

    const jobPosting = await this.prisma.jobPosting.create({
      data: { ...data, companyProfileId },
    });

    if (!jobPosting) {
      throw new BadRequestException('Error creating job posting');
    }

    return jobPosting;
  }

  async getCompanyJobPostings(
    userId: string,
    page: number,
    pageSize: number,
    period: 'all' | 'weekly' | 'monthly' | 'yearly',
  ): Promise<PaginatedJobPostingResponseDto> {
    const companyProfileId = await this.findUserAndRelatedProfile(userId);

    const where: { companyProfileId: string; createdAt?: { gte: Date } } = {
      companyProfileId,
    };

    if (period !== 'all') {
      let createdAt: Date;
      switch (period) {
        case 'weekly':
          createdAt = sub(new Date(), { weeks: 1 });
          break;
        case 'monthly':
          createdAt = sub(new Date(), { months: 1 });
          break;
        case 'yearly':
          createdAt = sub(new Date(), { years: 1 });
          break;
        default:
          throw new BadRequestException('Invalid period provided.');
      }
      where.createdAt = { gte: createdAt };
    }

    const skip = (page - 1) * pageSize;

    const [jobPostings, total] = await Promise.all([
      this.prisma.jobPosting.findMany({
        skip,
        take: pageSize,
        where,
      }),
      this.prisma.jobPosting.count({
        where,
      }),
    ]);

    return {
      data: jobPostings,
      total,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async getJobPostings(
    page: number,
    pageSize: number,
    field?: JobField,
    salaryMin?: number,
    salaryMax?: number,
  ): Promise<PaginatedJobPostingResponseDto> {
    const skip = (page - 1) * pageSize;

    const where: {
      field?: JobField;
      salaryMin?: { gte: number };
      salaryMax?: { lte: number };
    } = {
      ...(field && { field }),
      ...(salaryMin && { salaryMin: { gte: salaryMin } }),
      ...(salaryMax && { salaryMax: { lte: salaryMax } }),
    };

    const [jobPostings, total] = await Promise.all([
      this.prisma.jobPosting.findMany({
        skip,
        take: pageSize,
        where,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.jobPosting.count({
        where,
      }),
    ]);

    return {
      data: jobPostings,
      total,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  private async findUserAndRelatedProfile(userId: string): Promise<string> {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });
    if (!user) throw new BadRequestException('No user with the given id found');

    const companyProfile = await this.prisma.companyProfile.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!companyProfile)
      throw new BadRequestException('No such company profile found.');

    return companyProfile.id;
  }

  async getSelectedJobPosting(jobPostingId: string): Promise<JobPosting> {
    const jobPosting = await this.prisma.jobPosting.findFirst({
      where: { id: jobPostingId },
    });
    if (!jobPosting) throw new NotFoundException('No Job Posting Found.');

    return jobPosting;
  }

  async updateJobPosting(
    id: string,
    data: Partial<JobPostingDto>,
  ): Promise<JobPosting> {
    const jobPosting = await this.prisma.jobPosting.update({
      where: {
        id,
      },
      data,
    });

    if (!jobPosting)
      throw new NotFoundException('No job posting with that id found');

    return jobPosting;
  }
}
