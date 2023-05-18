import { Injectable } from '@nestjs/common';
import { UserRepositoryService } from '../../repositories/user/user.repository.service';
import { CreateUserRequestDto, UpdateUserRequestDto } from './dtos/requests';
import { User } from 'src/schemas/User.schema';
import { UserResponseDto } from './dtos/response';
import { AwsService } from '../aws/aws.service';
import { v4 as uuid } from 'uuid';
import { CreateUserDto, UpdateUserDto } from './dtos/repository';

@Injectable()
export class UserService {
  constructor(
    private awsService: AwsService,
    private repository: UserRepositoryService,
  ) {}

  async createUser(userDto: CreateUserRequestDto): Promise<UserResponseDto> {
    return this.repository.create(userDto);
  }

  async updateUser(
    userId,
    { profilePicture, ...updateUserData }: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    const userDto: UpdateUserDto = updateUserData;

    if (profilePicture) {
      const { Location } = await this.awsService.uploadFileToS3(
        profilePicture.buffer,
        `profile/${uuid()}`,
      );
      userDto.profilePictureUrl = Location;
    }
    return this.repository.update(userId, updateUserData);
  }

  async findByUsername(username: string) {
    return this.repository.findByUsername(username);
  }

  async findById(userId: string): Promise<UserResponseDto> {
    return this.repository.findById(userId);
  }

  async followUser(userId, followingId): Promise<UserResponseDto> {
    await this.repository.addToFollower(followingId, userId);
    return this.repository.addToFollowing(userId, followingId);
  }
}
