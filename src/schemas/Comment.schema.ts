import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './User.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop({ required: true })
  text: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], required: true })
  author: User;

  //   TODO: remember to check the implementation
  @Prop({ type: Date, default: Date.now() })
  cretedAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
