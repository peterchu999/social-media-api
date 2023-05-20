import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class UpdateUserRequestDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  biography?: string;

  @ApiPropertyOptional({
    description: 'image file',
  })
  @IsOptional()
  profilePicture?: Express.Multer.File;
}

export class FollowUserRequestDto {
  @ApiProperty()
  @IsString()
  userId: string;
}
