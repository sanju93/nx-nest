import { Schema, Document } from 'mongoose';

export const SchemaName = 'Users';

export interface IUserSchema {
  userName: String;
  password: String;
  email: String;
}
export const UserSchema = new Schema<IUserSchema>({
  userName: {
    type: Schema.Types.String,
    unique: true,
  },
  password: {
    type: Schema.Types.String,
  },
  email: {
    type: Schema.Types.String,
    unique: true,
  },
});

export type IUserSchemaDocument = IUserSchema & Document;
