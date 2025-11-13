/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { CustomLoggerService, LoggingInterceptor } from '@nx-nest/common';

import { AppModule } from './app/app.module';
import { ExceptionsFilter } from './app/ExceptionFilter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLoggerService(),
  });
  const logger = app.get(CustomLoggerService);

  // app.useLogger(logger);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalFilters(new ExceptionsFilter(logger));
  app.useGlobalInterceptors(new LoggingInterceptor(logger));
  app.enableCors({ origin: '*' });

  // swagger setup

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Notes API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);

  SwaggerModule.setup(globalPrefix, app, document, {
    customCss: `.swagger-ui .topbar { display : none; }
    `,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log({ line: `Listening at http://localhost:${port}/${globalPrefix}` });
}

bootstrap().catch(() => {
  new CustomLoggerService().error({ line: 'bootstrap error' });
});
