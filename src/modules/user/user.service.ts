import { Injectable } from '@nestjs/common';
import { UserRepositoryService } from '../../repositories/user/user.repository.service';
import { CreateUserRequestDto, UpdateUserRequestDto } from './dtos/requests';
import { User } from 'src/schemas/User.schema';
import { UserResponseDto } from './dtos/response';

@Injectable()
export class UserService {
  constructor(private repository: UserRepositoryService) {}

  async createUser(user: CreateUserRequestDto): Promise<UserResponseDto> {
    return this.repository.create(user);
  }

  async updateUser(
    userId,
    updateUserData: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
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
