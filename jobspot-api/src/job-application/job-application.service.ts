import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ApplicantProfile, JobApplication } from '@prisma/client';
import { PrismaService } from 'src/datasource/prisma.service';

@Injectable()
export class JobApplicationService {
  constructor(private readonly prisma: PrismaService) {}

  async createJobApplication(
    userId: string,
    jobPostingId: string,
  ): Promise<JobApplication> {
    const applicantProfileId = await this.getUserApplicantProfile(userId);
    const existingApplication = await this.prisma.jobApplication.findFirst({
      where: {
        applicantProfileId,
        jobPostingId,
      },
    });
    if (existingApplication)
      throw new BadRequestException(
        'You have already applied for this job posting.',
      );
    const jobApplication = await this.prisma.jobApplication.create({
      data: {
        applicantProfileId,
        jobPostingId,
      },
    });

    if (!jobApplication)
      throw new BadRequestException('Failed to create a job application');

    return jobApplication;
  }

  async getUserApplications(userId: string): Promise<JobApplication[]> {
    const applicantProfileId = await this.getUserApplicantProfile(userId);
    return await this.prisma.jobApplication.findMany({
      where: { applicantProfileId },
      include: { jobPosting: true },
    });
  }

  private async getUserApplicantProfile(userId: string): Promise<string> {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });
    if (!user) throw new NotFoundException('No user with the given id found.');

    const applicantProfile = await this.prisma.applicantProfile.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!applicantProfile)
      throw new NotFoundException('No profile related to this id found.');

    return applicantProfile.id;
  }

  async getJobApplicants(
    userId: string,
    jobPostingIds: string[],
  ): Promise<{
    applicants: ApplicantProfile[];
    jobApplications: JobApplication[];
  }> {
    const companyProfile = await this.prisma.companyProfile.findFirst({
      where: { userId },
    });
    if (!companyProfile)
      throw new NotFoundException(
        'No company profile related to this user found',
      );
    const companyJobPostings = await this.prisma.jobPosting.findMany({
      where: {
        id: { in: jobPostingIds },
        companyProfileId: companyProfile.id,
      },
    });
    if (!companyJobPostings)
      throw new NotFoundException(
        'No job postings related to this company found.',
      );
    const jobApplications = await this.prisma.jobApplication.findMany({
      where: { jobPostingId: { in: jobPostingIds } },
      include: { applicantProfile: true },
    });

    const applicants = jobApplications.map(
      (application) => application.applicantProfile,
    );

    return { applicants, jobApplications };
  }

  async userAppliedForJob(
    userId: string,
    jobPostingId: string,
  ): Promise<boolean> {
    const applicantProfileId = await this.getUserApplicantProfile(userId);

    const application = await this.prisma.jobApplication.findFirst({
      where: { jobPostingId, applicantProfileId },
    });

    return !!application;
  }
}
