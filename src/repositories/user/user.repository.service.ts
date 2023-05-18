import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateUserRequestDto,
  UpdateUserRequestDto,
} from '../../modules/user/dtos/requests';
import { User } from '../../schemas/User.schema';
import {
  CreateUserDto,
  UpdateUserDto,
} from '../../modules/user/dtos/repository';

@Injectable()
export class UserRepositoryService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUser: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUser);
    return user.save();
  }

  async update(userId, updateUserData: UpdateUserDto) {
    return this.userModel.findOneAndUpdate({ _id: userId }, updateUserData, {
      new: true,
    });
  }

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username });
  }

  async findById(userId: string): Promise<User> {
    return this.userModel.findOne({ _id: userId });
  }

  async addToFollower(userId: string, followerId: string): Promise<User> {
    return this.userModel.findOneAndUpdate(
      { _id: userId, 'followers._id': { $nin: [followerId] } },
      {
        $addToSet: {
          followers: followerId,
        },
      },
      { new: true },
    );
  }

  async addToFollowing(userId: string, followingId: string): Promise<User> {
    return this.userModel.findOneAndUpdate(
      { _id: userId, 'following._id': { $nin: [followingId] } },
      {
        $addToSet: {
          following: followingId,
        },
      },
      { new: true },
    );
  }
}
