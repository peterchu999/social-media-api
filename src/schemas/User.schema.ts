import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: Types.ObjectId, auto: true })
  id: string;

  @Prop()
  username: string;

  @Prop()
  biography: string;

  @Prop()
  profilePictureUrl: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
