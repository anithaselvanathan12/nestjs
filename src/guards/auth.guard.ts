import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthGaurd implements CanActivate {

  canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    return request.session.userId;
  }
}
