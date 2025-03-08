import { JobField, JobType } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const jobPostingSchema = z.object({
  title: z.string().describe('Job title'),
  description: z.string().describe('Job Description'),
  field: z
    .enum([
      JobField.CONSTRUCTION_TRADES,
      JobField.CREATIVE_DESIGN,
      JobField.CUSTOMER_SERVICE_SUPPORT,
      JobField.EDUCATION_TEACHING,
      JobField.ENGINEERING,
      JobField.FINANCE_ACCOUNTING,
      JobField.HEALTHCARE_MEDICAL,
      JobField.HOSPITALITY_TOURISM,
      JobField.HUMAN_RESOURCES,
      JobField.INFORMATION_TECHNOLOGY,
      JobField.LEGAL_COMPLIANCE,
      JobField.MARKETING_ADVERTISING,
      JobField.RETAIL_ECOMMERCE,
      JobField.SALES_BUSINESS_DEVELOPMENT,
      JobField.TRANSPORTATION_LOGISTICS,
    ])
    .describe('Relevant job field'),
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
