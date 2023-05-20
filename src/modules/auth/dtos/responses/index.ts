import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class SignUpResponseDto {
  @ApiProperty()
  @Expose()
  username: string;

  @Exclude()
  password: string;
}

export class LoginResponseDto {
  @ApiProperty()
  @Expose()
  access_token: string;
}
