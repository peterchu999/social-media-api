import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: Types.ObjectId, required: true })
  cognitoId: string;

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

  //   TODO: remember to check the implementation
  @Prop({ type: Date, default: Date.now() })
  cretedAt: Date;

  //   TODO: remember to check the implementation
  @Prop({ type: Date, required: false })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
