import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  token: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
