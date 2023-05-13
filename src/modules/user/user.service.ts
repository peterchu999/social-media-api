import { Injectable } from '@nestjs/common';
import { UserRepositoryService } from 'src/repositories/user/user.repository.service';

@Injectable()
export class UserService {
  constructor(private repository: UserRepositoryService) {}
}
