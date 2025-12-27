import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategy/jwt-strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { DbModule } from '@nx-nest/db';
import { EnvModule } from '@nx-nest/env';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DbModule,
    EnvModule,
  ],
  providers: [JwtStrategy, JwtAuthGuard],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
