
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector : Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const AccessRoles = this.reflector.get('roles', context.getHandler()) as string[];
    console.log(AccessRoles)
    console.log(request?.user.role)
    return AccessRoles.includes(request?.user.role);
  }
}
