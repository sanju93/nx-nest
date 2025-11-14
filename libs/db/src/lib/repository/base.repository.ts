import { Injectable, OnModuleInit } from '@nestjs/common';
import { Schema, Document, Model } from 'mongoose';
import { MongoConnectionService } from '../services/mongo-connection.service';

@Injectable()
export abstract class BaseRepository implements OnModuleInit {
  config: {
    schemaName: string;
    schema: Schema; //@ts-ignore
  };

  constructor(protected mongoConnection: MongoConnectionService) {}

  public details<T extends Document>(): Model<unknown> {
    return this.mongoConnection
      .getConnection()
      .model<unknown>(this.config.schemaName, this.config.schema);
  }

  protected setSchema(config: { schemaName: string; schema: Schema }) {
    this.config = config;
  }

  abstract onModuleInit();
}
