import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepositoryModule } from '../../repositories/post/post.repository.module';

@Module({
  imports: [PostRepositoryModule],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
