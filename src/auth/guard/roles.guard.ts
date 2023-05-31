/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../Roles/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const userIdFromToken = user.id;
    const userIdFromParams = context.switchToHttp().getRequest().params.userId;

    if (userIdFromToken !== userIdFromParams) {
      throw new UnauthorizedException('You are not authorized to access this resource.');
    }

    return requiredRoles.some((role) => user.role?.includes(role));
  }
}