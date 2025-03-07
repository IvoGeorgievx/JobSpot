import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignInCredentialsDto,
  SignUpCredentialsDto,
  UserSignInResponseDto,
  UserSignUpResponseDto,
} from '../users/dto/user.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Creates a new account' })
  @ApiBody({ type: SignUpCredentialsDto })
  @ApiResponse({ status: 201, description: 'User is created' })
  @ApiResponse({ status: 400, description: 'Email is already registered' })
  async registerUser(
    @Body() credentials: SignUpCredentialsDto,
  ): Promise<UserSignUpResponseDto> {
    return this.authService.signUp(credentials);
  }

  @Post('signin')
  @ApiOperation({ summary: 'User logs into his account' })
  @ApiBody({ type: SignInCredentialsDto })
  @ApiResponse({ status: 200, description: 'User logged in' })
  @ApiResponse({ status: 401, description: 'Wrong Credentials' })
  async loginUser(
    @Body() credentials: SignInCredentialsDto,
  ): Promise<UserSignInResponseDto> {
    return this.authService.signIn(credentials);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'User retrieves profile info' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved info' })
  async getMe(@Req() req: { user: { sub: string } }) {
    const userId = req.user.sub;
    return this.authService.getMe(userId);
  }
}
