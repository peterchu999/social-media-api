import { Exclude, Expose, Transform } from 'class-transformer';
import { Types } from 'mongoose';
import { User } from 'src/schemas/User.schema';

export class UserResponseDto implements User {
  @Expose()
  //   @Transform((value) => value.toString())
  _id: Types.ObjectId;
  @Exclude()
  password: string;
  @Expose()
  username: string;
  @Expose()
  biography?: string;
  @Expose()
  profilePictureUrl?: string;
  @Expose()
  followers: User[];
  @Expose()
  following: User[];
}
