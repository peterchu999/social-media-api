import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUserRequestDto {}

export class CreateUserDto {
  @IsUUID()
  id: string;

  @IsString()
  username: string;

  @IsString()
  @IsOptional()
  biography?: string;

  @IsString()
  @IsOptional()
  profilePictureUrl?: string;
}
