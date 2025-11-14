import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@nx-nest/db';
import {
  IUserSchemaDocument,
  SchemaName,
  UserSchema,
} from '../schemas/User.Schema';
import { IUserModel } from '../models/auth.dto';

@Injectable()
export class UsersRepository extends BaseRepository {
  async createUser(user: IUserModel) {
    return await this.details().create(user);
  }

  onModuleInit() {
    this.setSchema({
      schema: UserSchema,
      schemaName: SchemaName,
    });
  }
}
