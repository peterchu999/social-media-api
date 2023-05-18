import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';

import { monggodbProviderInit } from '../providers/monggodb.provider';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { AwsModule } from './aws/aws.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    monggodbProviderInit(),
    UserModule,
    PostModule,
    AuthModule,
    AwsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        exceptionFactory: (errors) => errors,
      }),
    },
  ],
})
export class AppModule {}
