import {
  Injectable,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { CustomLoggerService } from '@nx-nest/common';

@Injectable()
export class ExceptionsFilter implements ExceptionFilter {
  constructor(protected logger: CustomLoggerService) {}

  catch(exception: Partial<Error>, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal Server Error';

    if (exception instanceof BadRequestException) {
      res.status(422).json({
        statusCode: 422,
        message: exception.message,
      });
      return;
    }

    res.status(status).json({
      response: errResponse,
      message: exception.message,
      statusCode: status,
    });

    this.logger.error({
      line: 'Exception',
      error: exception,
      data: { body: req.body },
    });
  }
}
