/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { CustomLoggerService, LoggingInterceptor } from '@nx-nest/common';

import { AppModule } from './app/app.module';
import { ExceptionsFilter } from './app/ExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(CustomLoggerService);

  app.useLogger(logger);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalFilters(new ExceptionsFilter(logger));
  app.useGlobalInterceptors(new LoggingInterceptor(logger));

  const port = process.env.PORT || 3000;
  await app.listen(port);
  // `Logger.log(
  //   `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  // );`
}

bootstrap();
