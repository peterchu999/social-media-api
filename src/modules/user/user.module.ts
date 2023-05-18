import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepositoryModule } from '../../repositories/user/user.repository.module';
import { AwsModule } from '../aws/aws.module';

@Module({
  imports: [AwsModule, UserRepositoryModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
