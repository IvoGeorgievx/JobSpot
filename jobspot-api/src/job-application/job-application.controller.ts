import {
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Applicant applies for a job' })
  @ApiQuery({ required: true, type: String })
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
  @ApiOperation({ summary: 'Applicant get the jobs he applied to' })
  getUserApplications(@Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;
    return this.jobApplicationService.getUserApplications(userId);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('company')
  @Get('applicants')
  @ApiOperation({
    summary: 'Company account gets job applicants for a given job',
  })
  @ApiQuery({
    name: 'jobPostingIds',
    required: true,
    type: String,
  })
  getJobApplicants(
    @Query(
      'jobPostingIds',
      new ParseArrayPipe({ items: String, separator: ',' }),
    )
    jobPostingIds: string[],
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;
    return this.jobApplicationService.getJobApplicants(userId, jobPostingIds);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('applicant')
  @Get(':id')
  @ApiOperation({ summary: 'Check if the applicant applied for a job' })
  @ApiParam({ name: 'id', required: true, type: String })
  userAppliedForJob(
    @Param('id') jobPostingId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;
    return this.jobApplicationService.userAppliedForJob(userId, jobPostingId);
  }
}
