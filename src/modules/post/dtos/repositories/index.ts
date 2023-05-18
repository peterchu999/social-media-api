import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Comment } from '../../../../schemas/Comment.schema';
import { User } from '../../../../schemas/User.schema';

export class CommentDto {
  @IsString()
  text: string;

  @IsString()
  author: string;
}

export class CreatePostDto {
  @IsString()
  imageUrl: string;

  @IsString()
  author: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray({ each: true })
  @IsOptional()
  keywords?: string[];
}

export class UpdatePostDto {
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsString({ each: true })
  @IsOptional()
  likes?: (string | User)[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  comments?: Comment[];
}
