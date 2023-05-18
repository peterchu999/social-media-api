import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreatePostRequestDto {
  image: Express.Multer.File;
  author: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray({ each: true })
  @IsOptional()
  keywords?: string[];
}

export class UpdatePostRequestDto {
  @IsOptional()
  image?: Express.Multer.File;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  keywords: string[];
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
