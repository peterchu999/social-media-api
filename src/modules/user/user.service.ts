import { Injectable } from '@nestjs/common';
import { UserRepositoryService } from '../../repositories/user/user.repository.service';

@Injectable()
export class UserService {
  constructor(private repository: UserRepositoryService) {}
}
