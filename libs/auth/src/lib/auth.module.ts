import { Module } from '@nestjs/common';
import {
  PassportLocalStrategy,
  SessionSerializer,
} from './strategy/local-strategy';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/auth.guard';

@Module({
  imports: [PassportModule.register(PassportLocalStrategy)],
  controllers: [],
  providers: [PassportLocalStrategy, LocalAuthGuard, SessionSerializer],
  exports: [LocalAuthGuard],
})
export class AuthModule {}
