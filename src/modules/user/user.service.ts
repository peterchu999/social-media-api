import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { UserRepositoryService } from '../../repositories/user/user.repository.service';
import { AwsService } from '../aws/aws.service';
import { UpdateUserDto } from './dtos/repository';
import { CreateUserRequestDto, UpdateUserRequestDto } from './dtos/requests';
import { UserResponseDto } from './dtos/response';
import { plainToInstance } from 'class-transformer';

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
    return plainToInstance(
      UserResponseDto,
      await this.repository.update(userId, updateUserData),
      { excludeExtraneousValues: true },
    );
  }

  async findByUsername(username: string) {
    return this.repository.findByUsername(username);
  }

  async findById(userId: string): Promise<UserResponseDto> {
    return plainToInstance(
      UserResponseDto,
      await this.repository.findById(userId),
      { excludeExtraneousValues: true },
    );
  }

  async followUser(userId, followingId): Promise<UserResponseDto> {
    await this.repository.addToFollower(followingId, userId);
    return plainToInstance(
      UserResponseDto,
      await this.repository.addToFollowing(userId, followingId),
      { excludeExtraneousValues: true },
    );
  }
}
