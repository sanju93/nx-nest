import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvService } from './service/env.service';
import { resolve } from 'node:path';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [resolve('.env')],
    }),
  ],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
