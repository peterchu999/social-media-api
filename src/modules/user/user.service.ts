import { Injectable } from '@nestjs/common';
import { UserRepositoryService } from '../../repositories/user/user.repository.service';
import { CreateUserDto } from './dtos/requests';
import { User } from 'src/schemas/User.schema';

@Injectable()
export class UserService {
  constructor(private repository: UserRepositoryService) {}

  async createUser(user: CreateUserDto): Promise<User> {
    return this.repository.create(user);
  }

  async findByUserName(username: string) {
    return this.repository.findByUserName(username);
  }
}
