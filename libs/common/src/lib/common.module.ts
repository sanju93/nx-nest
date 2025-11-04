import { Module } from '@nestjs/common';
import { CustomLoggerService } from './logger/logger.service';
import { LoggingInterceptor } from './logger/logging.interceptor';

@Module({
  providers: [CustomLoggerService],
  exports: [CustomLoggerService],
})
export class CommonModule {}
