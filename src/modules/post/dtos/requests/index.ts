import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreatePostRequestDto {
  @IsUrl()
  imageUrl: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdatePostRequestDto {
  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class CommentPostRequestDto {
  @IsString()
  text: string;
}

export class LikesPostDto {
  @IsString()
  userId: string;

  @IsString()
  postId: string;
}

export class DeletePostDto {
  @IsString()
  userId: string;

  @IsString()
  postId: string;
}
