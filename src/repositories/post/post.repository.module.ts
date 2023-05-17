import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostRepositoryService } from './post.repository.service';

import { Post, PostSchema } from '../../schemas/Post.schema';
import { CommentSchema, Comment } from 'src/schemas/Comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
  ],
  providers: [PostRepositoryService],
  exports: [PostRepositoryService],
})
export class PostRepositoryModule {}
