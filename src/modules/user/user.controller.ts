import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Patch,
  UseInterceptors,
  Request,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthRequest } from '../../types/http';
import { UserResponseDto } from './dtos/response';
import { JwtAuthGuard } from 'src/guards';
import { User } from 'src/schemas/User.schema';
import { FollowUserRequestDto, UpdateUserRequestDto } from './dtos/requests';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Patch('/')
  @ApiOperation({ summary: 'update user information' })
  @ApiResponse({
    status: 200,
    description: 'Successfully Update User Information',
  })
  async updateProfile(
    @Request() { user: { userId } }: AuthRequest,
    @Body() userUpdateDto: UpdateUserRequestDto,
  ) {
    console.log(userUpdateDto);
    return this.userService.updateUser(userId, userUpdateDto);
  }

  @Get('/')
  @ApiOperation({ summary: 'get user information' })
  @ApiResponse({
    status: 200,
    description: 'Successfully Retrive User Information',
  })
  async getUserInformation(
    @Request() { user: { userId } }: AuthRequest,
  ): Promise<UserResponseDto> {
    return this.userService.findById(userId);
  }

  @Post('/follow')
  @ApiOperation({ summary: 'follow another user' })
  @ApiResponse({
    status: 200,
    description: "You've follow another user",
  })
  async followUser(
    @Request() { user: { userId } }: AuthRequest,
    @Body() { userId: followingId }: FollowUserRequestDto,
  ) {
    return this.userService.followUser(userId, followingId);
  }
}
