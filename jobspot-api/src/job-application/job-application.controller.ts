import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/guards/roles.decorator';
import { AuthenticatedRequest } from 'src/types/auth.types';
import { JobApplicationService } from './job-application.service';

@Controller('job-application')
@ApiBearerAuth()
export class JobApplicationController {
  constructor(private readonly jobApplicationService: JobApplicationService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('applicant')
  @Post('new')
  createJobApplication(
    @Req() req: AuthenticatedRequest,
    @Query('jobPostingId') jobPostingId: string,
  ) {
    const userId = req.user.sub;
    return this.jobApplicationService.createJobApplication(
      userId,
      jobPostingId,
    );
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('applicant')
  @Get('user')
  getUserApplications(@Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;
    return this.jobApplicationService.getUserApplications(userId);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('company')
  @Get('applicants')
  getJobApplicants(
    @Query('jobPostingIds') jobPostingIds: string[],
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;
    return this.jobApplicationService.getJobApplicants(userId, jobPostingIds);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('applicant')
  @Get(':id')
  userAppliedForJob(
    @Param('id') jobPostingId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;
    return this.jobApplicationService.userAppliedForJob(userId, jobPostingId);
  }
}
