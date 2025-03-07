import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/datasource/prisma.service';
import { UsersService } from 'src/users/users.service';
import { JobApplicationService } from './job-application.service';
import { JobApplicationController } from './job-application.controller';

@Module({
  controllers: [JobApplicationController],
  providers: [JobApplicationService, AuthService, PrismaService, UsersService],
})
export class JobApplicationModule {}
