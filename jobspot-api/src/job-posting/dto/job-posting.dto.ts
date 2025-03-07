import { JobType } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const jobPostingSchema = z.object({
  title: z.string().describe('Job title'),
  description: z.string().describe('Job Description'),
  field: z.string().describe('Relevant job field'),
  jobType: z.enum([
    JobType.CONTRACT,
    JobType.FREELANCE,
    JobType.FULL_TIME,
    JobType.INTERN,
    JobType.PART_TIME,
    JobType.TEMPORARY,
  ]),
  requirements: z.string().describe('Requirements for the applicant'),
  responsibilities: z.string().describe('Responsibilities related to the job'),
  salaryMin: z.number().nullable().describe('Minimum budget for the salary'),
  salaryMax: z.number().nullable().describe('Maximum budget for the salary'),
});

const paginatedJobPostings = z.object({
  total: z.number(),
  totalPages: z.number(),
  data: z.array(jobPostingSchema),
});
export class JobPostingDto extends createZodDto(jobPostingSchema) {}
export class PaginatedJobPostingResponseDto extends createZodDto(
  paginatedJobPostings,
) {}
