import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards';
import { AuthRequest } from '../../types/http';
import { FollowUserRequestDto, UpdateUserRequestDto } from './dtos/requests';
import { UserResponseDto } from './dtos/response';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @UseInterceptors(FileInterceptor('profilePicture'))
  async updateProfile(
    @Request() { user: { userId } }: AuthRequest,
    @Body() userUpdateDto: UpdateUserRequestDto,
    @UploadedFile() profilePicture: Express.Multer.File,
  ) {
    return this.userService.updateUser(userId, {
      ...userUpdateDto,
      profilePicture,
    });
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
