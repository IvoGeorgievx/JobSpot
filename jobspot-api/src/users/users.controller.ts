import {
  Body,
  Controller,
  Get,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import {
  UpdateApplicantProfileDto,
  UpdateCompanyProfileDto,
} from './dto/user.dto';
import { UsersService } from './users.service';
import { AuthenticatedRequest } from 'src/types/auth.types';

type ProfileUpdateDto = UpdateApplicantProfileDto | UpdateCompanyProfileDto;

@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Put('profile/update')
  @ApiOperation({ summary: 'Update user profile with relevant fields' })
  @ApiBody({
    type: UpdateApplicantProfileDto || UpdateCompanyProfileDto,
  })
  @ApiResponse({
    status: 200,
    description: 'User profile successfully updated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Failed to update user profile',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async updateUserProfile(
    @Req() req: AuthenticatedRequest,
    @Body()
    body: ProfileUpdateDto,
  ) {
    const userId = req.user.sub;
    return this.usersService.updateProfile(userId, body);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Put('profile/update/picture')
  @ApiOperation({ summary: 'User uploads profile picture' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: 'Successfully uploaded profile picture',
  })
  updateProfilePicture(
    @Req() req: AuthenticatedRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const userId = req.user.sub;
    return this.usersService.uploadProfilePicture(userId, file);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Put('profile/update/cv')
  @ApiOperation({ summary: 'User uploads cv' })
  @ApiConsumes('multipart/form-data')
  updateApplicantCv(
    @Req() req: AuthenticatedRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const userId = req.user.sub;
    return this.usersService.uploadCv(userId, file);
  }

  @UseGuards(AuthGuard)
  @Get('profile/me')
  @ApiOperation({ summary: 'Fetches the company/applicant profile' })
  getUserProfile(@Req() req: AuthenticatedRequest) {
    const { sub: userId, role } = req.user;
    return this.usersService.getUserProfile(userId, role);
  }
}
