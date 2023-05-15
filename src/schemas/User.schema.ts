import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Transform(({ value }) => value.toString())
  _id: Types.ObjectId;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: false })
  biography?: string;

  @Prop({ required: false })
  profilePictureUrl?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  followers: User[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  following: User[];
}

export const UserSchema = SchemaFactory.createForClass(User);
