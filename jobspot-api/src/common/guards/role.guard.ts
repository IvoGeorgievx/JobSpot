import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers?.authorization
      ? request.headers.authorization.split(' ')[1]
      : null;

    if (token) {
      try {
        const decodedToken: { role: string } =
          await this.jwtService.decode(token);
        const { role: userRole } = decodedToken;

        return roles.some((role) => role === userRole.toLowerCase());
      } catch {
        console.error('Invalid token');
        return false;
      }
    }

    return false;
  }
}
