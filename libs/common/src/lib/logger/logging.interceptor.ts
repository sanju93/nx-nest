import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { CustomLoggerService } from '@nx-nest/common';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(protected logger: CustomLoggerService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();

    return next.handle().pipe(
      tap(() => {
        this.logger.log({
          message: req.url,
        });
      }),
      catchError((err) => {
        this.logger.log({
          message: 'not found',
        });
        return throwError(err);
      })
    );
  }
}
