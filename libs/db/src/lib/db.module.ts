import { Module } from '@nestjs/common';
import { MongoConnectionService } from './services/mongo-connection.service';

@Module({
  controllers: [],
  providers: [MongoConnectionService],
  exports: [MongoConnectionService],
})
export class DbModule {}
