import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ApplicantProfile, CompanyProfile, UserRole } from '@prisma/client';
import { PrismaService } from 'src/datasource/prisma.service';
import {
  UpdateApplicantProfileDto,
  UpdateCompanyProfileDto,
} from './dto/user.dto';
import { S3, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class UsersService {
  private s3: S3;
  private pictureBucketName: string;
  private cvBucketName: string;
  constructor(private readonly prisma: PrismaService) {
    this.pictureBucketName = 'profile-pic-bucket';
    this.cvBucketName = 'cv-bucket';
    this.s3 = new S3({
      endpoint: 'http://localhost:4566',
      region: 'us-east-1',
      forcePathStyle: true,
    });
  }

  async updateProfile(
    userId: string,
    data: UpdateApplicantProfileDto | UpdateCompanyProfileDto,
  ): Promise<ApplicantProfile | CompanyProfile> {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });
    if (!user) throw new BadRequestException('No such user found');

    if (user.role === UserRole.APPLICANT) {
      const userProfile = await this.prisma.applicantProfile.findFirst({
        where: { userId },
      });

      if (!userProfile)
        throw new NotFoundException('Applicant profile not found');

      const applicantProfile = await this.prisma.applicantProfile.update({
        where: {
          id: userProfile.id,
        },
        data: data as UpdateApplicantProfileDto,
      });

      return applicantProfile;
    }

    const userProfile = await this.prisma.companyProfile.findFirst({
      where: { userId },
    });

    if (!userProfile) throw new NotFoundException('Company profile not found');

    const companyProfile = await this.prisma.companyProfile.update({
      where: {
        id: userProfile.id,
      },
      data: data as UpdateCompanyProfileDto,
    });
    return companyProfile;
  }

  async uploadProfilePicture(userId: string, file: Express.Multer.File) {
    const fileName = `${userId}/${file.originalname}`;
    const uploadParams = {
      Bucket: this.pictureBucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    try {
      await this.s3.send(new PutObjectCommand(uploadParams));
      const imageUrl = `http://localhost:4566/${this.pictureBucketName}/${fileName}`;
      const user = await this.prisma.user.findFirst({
        where: { id: userId },
      });

      if (user) {
        await this.updateUserProfile(user.id, 'image', imageUrl);
      }

      return imageUrl;
    } catch (error) {
      console.error('Error uploading to S3:', error);
      throw new Error('Failed to upload profile picture');
    }
  }

  async uploadCv(userId: string, file: Express.Multer.File) {
    const cv = `${userId}/${file.originalname}`;
    const uploadParams = {
      Bucket: this.cvBucketName,
      Key: cv,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      await this.s3.send(new PutObjectCommand(uploadParams));
      const cvUrl = `http://localhost:4566/${this.cvBucketName}/${cv}`;
      const user = await this.prisma.user.findFirst({
        where: { id: userId },
      });

      if (user?.id) {
        await this.updateUserProfile(user.id, 'cv', cvUrl);
      }

      return cvUrl;
    } catch (error) {
      console.error('Error uploading to S3:', error);
      throw new Error('Failed to upload CV');
    }
  }

  private async updateUserProfile(
    userId: string,
    type: 'cv' | 'image',
    fileUrl: string,
  ): Promise<ApplicantProfile | CompanyProfile> {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('No user found');
    }
    if (user.role === UserRole.APPLICANT) {
      const applicantProfile = await this.prisma.applicantProfile.update({
        where: { userId },
        data: {
          [type === 'cv' ? 'cvUrl' : 'profilePicUrl']: fileUrl,
        },
      });

      if (!applicantProfile)
        throw new NotFoundException('No such profile found');
      console.log(applicantProfile);

      return applicantProfile;
    }
    const companyProfile = await this.prisma.companyProfile.update({
      where: { userId },
      data: {
        profilePicUrl: fileUrl,
      },
    });

    if (!companyProfile) throw new NotFoundException('No such profile found');
    return companyProfile;
  }

  async getUserProfile(userId: string, role: string) {
    const isApplicant = role === UserRole.APPLICANT;
    if (isApplicant) {
      return await this.prisma.applicantProfile.findFirst({
        where: { userId },
      });
    }
    return await this.prisma.companyProfile.findFirst({ where: { userId } });
  }
}
