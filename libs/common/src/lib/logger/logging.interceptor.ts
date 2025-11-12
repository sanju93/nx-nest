import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { CustomLoggerService, InternalLogger } from '@nx-nest/common';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(protected logger: CustomLoggerService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    const loggerService = new InternalLogger(context.getClass().name);
    const req = context.switchToHttp().getRequest();
    loggerService.setContextFromRequest(req);
    const now = Date.now();

    this.logger.log({
      line: 'Request Started',
      timeMs: now,
    });

    return next.handle().pipe(
      tap(() => {
        this.logger.log({
          line: 'Request Finished',
          timeMs: Date.now() - now,
        });
      }),
      catchError((err) => {
        this.logger.error({
          line: 'Request Failed',
          timeMs: Date.now() - now,
        });
        return throwError(err);
      })
    );
  }
}
