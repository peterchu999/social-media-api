import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
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

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  biography?: string;

  @IsString()
  @IsOptional()
  profilePictureUrl?: string;
}
