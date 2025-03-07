import { UserRole } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const baseUserSchema = z.object({
  email: z.string().email().describe('Email field'),
});

const signUpSchema = baseUserSchema.extend({
  role: z.enum([UserRole.APPLICANT, UserRole.COMPANY]).describe('Role field'),
  password: z.string().describe('Password field'),
});

const userRegisterResponseSchema = baseUserSchema
  .extend({
    id: z.string(),
    role: z.enum([UserRole.APPLICANT, UserRole.COMPANY]),
  })
  .transform(({ email, id, role }) => ({ id, email, role }));
// ^ Rearranges the order of the returned fields.

const userLoginResponseSchema = z.object({
  accessToken: z.string().describe('JWT token'),
});

const signInSchema = baseUserSchema.extend({
  password: z.string().describe('Password field'),
});

const updateApplicantProfileSchema = z.object({
  fullName: z.string(),
  phone: z.string(),
});

const updateCompanyProfileSchema = z.object({
  details: z.string(),
  field: z.string(),
  name: z.string(),
});

export class SignUpCredentialsDto extends createZodDto(signUpSchema) {}
export class UserSignUpResponseDto extends createZodDto(
  userRegisterResponseSchema,
) {}
export class UserSignInResponseDto extends createZodDto(
  userLoginResponseSchema,
) {}
export class SignInCredentialsDto extends createZodDto(signInSchema) {}
export class UpdateApplicantProfileDto extends createZodDto(
  updateApplicantProfileSchema,
) {}
export class UpdateCompanyProfileDto extends createZodDto(
  updateCompanyProfileSchema,
) {}
