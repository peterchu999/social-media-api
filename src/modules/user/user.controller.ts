import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Patch('/')
  @ApiOperation({ summary: 'update user information' })
  @ApiResponse({
    status: 200,
    description: 'Successfully Update User Information',
  })
  async updateProfile() {
    // update user information on DB
  }

  @Get('/')
  @ApiOperation({ summary: 'get user information' })
  @ApiResponse({
    status: 200,
    description: 'Successfully Retrive User Information',
  })
  async getUserInformation() {
    // fetch users profile data from database
    // fetch users posts information
  }

  @Get('/following/posts')
  @ApiOperation({ summary: 'get current logged in user following posts' })
  @ApiResponse({
    status: 200,
    description: 'Posts from following users',
  })
  async getFollowingPosts() {
    // get the following post from posts services
  }
}
