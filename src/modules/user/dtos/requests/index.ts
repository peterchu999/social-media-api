import { IsOptional, IsString } from 'class-validator';

export class CreateUserRequestDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  biography?: string;

  @IsString()
  @IsOptional()
  profilePictureUrl?: string;
}

export class UpdateUserRequestDto {
  @IsString()
  @IsOptional()
  biography?: string;

  @IsString()
  @IsOptional()
  profilePictureUrl?: string;
}

export class FollowUserRequestDto {
  @IsString()
  userId: string;
}
