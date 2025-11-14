import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createConnection, Connection } from 'mongoose';

@Injectable()
export class MongoConnectionService implements OnModuleInit, OnModuleDestroy {
  #connection: Connection;
  onModuleInit() {
    this.#connection = createConnection('mongodb://mongodb:27017/');
  }

  onModuleDestroy() {
    this.#connection.destroy();
  }

  getConnection(): Connection {
    if (!this.#connection) {
      throw new Error("Connection can't established");
    }

    return this.#connection;
  }
}
