import { IsOptional, IsString } from 'class-validator';

export class CreateUserRequestDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class UpdateUserRequestDto {
  @IsString()
  @IsOptional()
  biography?: string;

  @IsOptional()
  profilePicture?: Express.Multer.File;
}

export class FollowUserRequestDto {
  @IsString()
  userId: string;
}
