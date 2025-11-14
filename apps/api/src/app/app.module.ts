import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { CommonModule } from '@nx-nest/common';
import { AuthModule } from '@nx-nest/auth';
import { LoggerMiddleware } from '@nx-nest/common';
import { NotesModule } from '@nx-nest/notes';
import { DbModule } from '@nx-nest/db';

@Module({
  imports: [CommonModule, AuthModule, NotesModule, DbModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('notes');
  }
}
