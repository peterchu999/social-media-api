import { Module } from '@nestjs/common';
import { monggodbProviderInit } from '../providers/monggodb.provider';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [monggodbProviderInit(), UserModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
