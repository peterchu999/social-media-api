import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreatePostRequestDto {
  @ApiProperty({
    description: 'image file',
  })
  image: Express.Multer.File;

  author: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsArray({ each: true })
  @IsOptional()
  keywords?: string[];
}

export class UpdatePostRequestDto {
  @ApiPropertyOptional({
    description: 'image file',
  })
  @IsOptional()
  image?: Express.Multer.File;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  keywords: string[];
}

export class CommentPostRequestDto {
  @ApiProperty()
  @IsString()
  text: string;
}

export class LikesPostDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  postId: string;
}

export class DeletePostDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  postId: string;
}
