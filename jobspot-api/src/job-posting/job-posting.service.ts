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
import { JobPosting } from '@prisma/client';

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
  ): Promise<PaginatedJobPostingResponseDto> {
    const companyProfileId = await this.findUserAndRelatedProfile(userId);

    const skip = (page - 1) * pageSize;

    const [jobPostings, total] = await Promise.all([
      this.prisma.jobPosting.findMany({
        skip,
        take: pageSize,
        where: {
          companyProfileId,
        },
      }),
      this.prisma.jobPosting.count({
        where: {
          companyProfileId,
        },
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
    field?: string,
    salaryMin?: number,
    salaryMax?: number,
  ): Promise<PaginatedJobPostingResponseDto> {
    const skip = (page - 1) * pageSize;

    const where: {
      field?: string;
      salaryMin?: number;
      salaryMax?: number;
    } = {
      ...(field && { field }),
      ...(salaryMin && { salaryMin }),
      ...(salaryMax && { salaryMax }),
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
