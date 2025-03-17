import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { JobField, JobPosting } from '@prisma/client';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/guards/roles.decorator';
import {
  JobPostingDto,
  PaginatedJobPostingResponseDto,
} from './dto/job-posting.dto';
import { JobPostingService } from './job-posting.service';
import { AuthenticatedRequest } from 'src/types/auth.types';

@Controller('job-posting')
@ApiBearerAuth()
export class JobPostingController {
  constructor(private readonly jobPostingService: JobPostingService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('company')
  @Post('new')
  @ApiOperation({ summary: 'Company profile creates a job posting' })
  @ApiBody({ type: JobPostingDto })
  createJobPosting(
    @Req() req: AuthenticatedRequest,
    @Body() body: JobPostingDto,
  ): Promise<JobPosting> {
    const userId = req.user.sub;
    return this.jobPostingService.createJobPosting(userId, body);
  }

  @Get('all')
  @ApiOperation({ summary: 'Gets the job postings' })
  getJobPostings(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('pageSize', ParseIntPipe) pageSize: number = 5,
    @Query('field') field?: JobField,
    @Query('salaryMin', new ParseIntPipe({ optional: true }))
    salaryMin?: number,
    @Query('salaryMax', new ParseIntPipe({ optional: true }))
    salaryMax?: number,
  ) {
    return this.jobPostingService.getJobPostings(
      page,
      pageSize,
      field,
      salaryMin,
      salaryMax,
    );
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('company')
  @Get('current')
  @ApiOperation({ summary: 'Company profile fetches its own job postings' })
  getCompanyJobPostings(
    @Req() req: AuthenticatedRequest,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('pageSize', ParseIntPipe) pageSize: number = 5,
    @Query('period') period: 'all' | 'weekly' | 'monthly' | 'yearly' = 'all',
  ): Promise<PaginatedJobPostingResponseDto> {
    const userId = req.user.sub;
    return this.jobPostingService.getCompanyJobPostings(
      userId,
      page,
      pageSize,
      period,
    );
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('company')
  @Get('selected')
  @ApiOperation({ summary: 'Gets a selected job-posting info' })
  getSelectedJobPosting(@Query('jobPostingId') jobPostingId: string) {
    return this.jobPostingService.getSelectedJobPosting(jobPostingId);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('company')
  @Put('update/:id')
  @ApiOperation({ summary: 'Updates a job posting by id' })
  updateJobPosting(
    @Param('id') id: string,
    @Body() data: Partial<JobPostingDto>,
  ) {
    return this.jobPostingService.updateJobPosting(id, data);
  }
}
