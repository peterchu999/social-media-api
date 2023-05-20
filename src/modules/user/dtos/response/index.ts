import {
  ApiProperty,
  ApiPropertyOptional,
  ApiResponseProperty,
} from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { Types } from 'mongoose';
import { User } from 'src/schemas/User.schema';

export class UserResponseDto implements User {
  @Expose()
  //   @Transform((value) => value.toString())
  _id: Types.ObjectId;

  @Exclude()
  password: string;

  @ApiProperty()
  @Expose()
  username: string;

  @ApiPropertyOptional()
  @Expose()
  biography?: string;

  @ApiPropertyOptional()
  @Expose()
  profilePictureUrl?: string;

  @ApiProperty()
  @Expose()
  followers: User[];

  @ApiProperty()
  @Expose()
  following: User[];
}
