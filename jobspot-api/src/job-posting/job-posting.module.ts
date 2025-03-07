import { Module } from '@nestjs/common';
import { JobPostingService } from './job-posting.service';
import { JobPostingController } from './job-posting.controller';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/datasource/prisma.service';

@Module({
  controllers: [JobPostingController],
  providers: [JobPostingService, AuthService, UsersService, PrismaService],
})
export class JobPostingModule {}
