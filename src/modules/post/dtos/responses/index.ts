import { Expose } from 'class-transformer';
import { User } from '../../../../schemas/User.schema';

class CommentResponseDto {
  @Expose()
  text: string;

  @Expose()
  author: User;
}

class PostResponseDto {
  @Expose()
  imageUrl: string;

  @Expose()
  description?: string;

  @Expose()
  likes: number;

  @Expose()
  comments: CommentResponseDto[];

  @Expose()
  cretedAt: Date;

  author: User;
  updatedAt: Date;
}

export class CreatePostResponseDto extends PostResponseDto {}

export class UpdatePostResponseDto extends PostResponseDto {}

export class LikePostResponseDto extends PostResponseDto {}

export class CommentPostResponseDto extends PostResponseDto {}

export class GetPostsResponseDto {
  @Expose()
  posts: PostResponseDto[];
}

export class DeletePostsresponseDto {
  @Expose()
  success: boolean;
}
