import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/modules/user/dtos/requests';
import { User } from 'src/schemas/User.schema';

@Injectable()
export class UserRepositoryService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUser: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUser);
    return user.save();
  }
}
