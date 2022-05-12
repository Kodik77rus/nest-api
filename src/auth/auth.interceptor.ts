import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

import { UserService } from '../user/user.service';

@Injectable()
export class RefreshTokenInterceptor implements NestInterceptor {
  constructor(public readonly userService: UserService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const httpContext = context.switchToHttp();
    const req = httpContext.getRequest();

    await this.userService.updateToken(req.user.name);
    return next.handle().pipe(
      catchError((err) => {
        return throwError(() => err);
      }),
    );
  }
}
