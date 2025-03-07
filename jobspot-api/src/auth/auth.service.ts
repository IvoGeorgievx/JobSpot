import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApplicantProfile, CompanyProfile, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import {
  SignInCredentialsDto,
  SignUpCredentialsDto,
  UserSignInResponseDto,
  UserSignUpResponseDto,
} from 'src/users/dto/user.dto';
import { PrismaService } from '../datasource/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(data: SignUpCredentialsDto): Promise<UserSignUpResponseDto> {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (existingUser) throw new BadRequestException('Email is already in use');

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    await this.createUserProfile(user.role, user.id);

    return UserSignUpResponseDto.schema.parse(user);
  }

  private async createUserProfile(
    role: UserRole,
    userId: string,
  ): Promise<CompanyProfile | ApplicantProfile> {
    try {
      if (role === UserRole.APPLICANT) {
        const applicantProfile = await this.prisma.applicantProfile.create({
          data: {
            userId,
          },
        });
        return applicantProfile;
      }
      const companyProfile = await this.prisma.companyProfile.create({
        data: {
          userId,
        },
      });
      return companyProfile;
    } catch {
      throw new BadRequestException('Failed to create profile');
    }
  }

  async signIn(data: SignInCredentialsDto): Promise<UserSignInResponseDto> {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!existingUser)
      throw new BadRequestException('Wrong email or password.');

    const passwordMatch = await bcrypt.compare(
      data.password,
      existingUser.password,
    );

    if (!passwordMatch)
      throw new BadRequestException('Wrong email or password');

    const payload = {
      sub: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findFirst({
      where: { id: userId },
      omit: { password: true },
    });

    if (!user) throw new BadRequestException('No user found');

    const isApplicant = user?.role === UserRole.APPLICANT;
    let profilePicUrl: string | null = null;

    if (isApplicant) {
      const applicantProfile = await this.prisma.applicantProfile.findFirst({
        where: { userId: user.id },
      });
      profilePicUrl = applicantProfile?.profilePicUrl ?? null;
    } else {
      const companyProfile = await this.prisma.companyProfile.findFirst({
        where: { userId: user.id },
      });
      profilePicUrl = companyProfile?.profilePicUrl ?? null;
    }

    return { ...user, profilePicUrl };
  }
}
