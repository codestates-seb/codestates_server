import { CallHandler, ExecutionContext, mixin, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

export const Role = {
  USER: 'USER',
} as const;

export const RoleInterceptorAPI = (role?: keyof typeof Role) => {
  class RoleInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
      const req = context.switchToHttp().getRequest();

      if (!req.user) throw new UnauthorizedException('로그인을 진행해주세요.');

      return next.handle();
    }
  }
  return mixin<RoleInterceptor>(RoleInterceptor);
};
