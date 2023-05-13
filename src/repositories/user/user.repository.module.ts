import { Module } from '@nestjs/common';
import { UserRepositoryService } from './user.repository.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserRepositoryService],
  exports: [UserRepositoryService],
})
export class UserRepositoryModule {}
