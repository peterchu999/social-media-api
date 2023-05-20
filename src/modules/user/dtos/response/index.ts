import {
  ApiProperty,
  ApiPropertyOptional,
  ApiResponseProperty,
} from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { Types } from 'mongoose';
import { User } from 'src/schemas/User.schema';

export class UserResponseDto implements User {
  @Expose({ name: '_id' })
  @Transform((data) => {
    return data.value.toString();
  })
  id: string;

  @Expose()
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
