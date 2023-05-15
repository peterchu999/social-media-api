import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUserRequestDto {}

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
