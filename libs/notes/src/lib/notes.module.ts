import { Module } from '@nestjs/common';
import { NotesQueryController } from './controller/notes.controller';
import { AuthModule } from '@nx-nest/auth';

@Module({
  imports: [AuthModule],
  controllers: [NotesQueryController],
  providers: [],
  exports: [],
})
export class NotesModule {}
