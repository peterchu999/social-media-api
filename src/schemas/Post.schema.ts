import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './User.schema';
import { Comment } from './Comment.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: User;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  likes: User[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }], default: [] })
  comments: Comment[];

  //   TODO: remember to check the implementation
  @Prop({ type: Date, default: Date.now() })
  cretedAt: Date;

  //   TODO: remember to check the implementation
  @Prop({ type: Date, required: false })
  updatedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
