import { IsString } from 'class-validator';

export class LoginRequestDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class SignUpRequestDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
