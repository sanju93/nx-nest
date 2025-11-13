import { Module } from '@nestjs/common';

import { CommonModule } from '@nx-nest/common';
import { AuthModule } from '@nx-nest/auth';

@Module({
  imports: [CommonModule, AuthModule],
})
export class AppModule {}
