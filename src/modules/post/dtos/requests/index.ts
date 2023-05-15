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
  imageUrl?: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class CommentPostRequestDto {
  @IsString()
  text: string;
}