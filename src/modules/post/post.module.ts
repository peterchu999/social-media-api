import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepositoryModule } from '../../repositories/post/post.repository.module';
import { UserModule } from '../user/user.module';
import { AwsModule } from '../aws/aws.module';

@Module({
  imports: [PostRepositoryModule, AwsModule, UserModule],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
