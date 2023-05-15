import { Exclude, Expose } from 'class-transformer';

export class SignUpResponseDto {
  @Expose()
  username: string;

  @Exclude()
  password: string;
}

export class LoginResponseDto {
  @Expose()
  access_token: string;
}
