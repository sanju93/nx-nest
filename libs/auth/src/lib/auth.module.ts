import { Module } from '@nestjs/common';
import {
  PassportLocalStrategy,
  SessionSerializer,
} from './strategy/local-strategy';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/auth.guard';
import { AuthController } from './controller/auth.controller';
import { UserService } from './service/user.service';
import { UsersRepository } from './service/users.repository';
import { DbModule } from '@nx-nest/db';

@Module({
  imports: [PassportModule.register(PassportLocalStrategy), DbModule],
  controllers: [AuthController],
  providers: [
    PassportLocalStrategy,
    LocalAuthGuard,
    SessionSerializer,
    UserService,
    UsersRepository,
  ],
  exports: [LocalAuthGuard],
})
export class AuthModule {}
