import { Module } from '@nestjs/common';
import { CustomLoggerService } from './logger/logger.service';

@Module({
  providers: [CustomLoggerService],
  exports: [CustomLoggerService],
})
export class CommonModule {}
