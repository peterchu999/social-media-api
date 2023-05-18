import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
import { JwtAuthGuard } from '../../guards';
import { AuthRequest } from '../../types/http';
import {
  CommentPostRequestDto,
  CreatePostRequestDto,
  UpdatePostRequestDto,
} from './dtos/requests';
import { PostService } from './post.service';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtAuthGuard)
@ApiTags('posts')
@ApiBearerAuth()
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('/')
  @ApiOperation({ summary: 'create new post' })
  @ApiResponse({
    status: 201,
    description: 'Successfully Create New Posts',
  })
  @UseInterceptors(FileInterceptor('image'))
  async createPost(
    @Request() { user: { userId } }: AuthRequest,
    @Body() data: CreatePostRequestDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.postService.createNewPost({
      ...data,
      image,
      author: userId,
    });
  }

  @Patch('/:postId')
  @ApiOperation({ summary: 'Update Post Information' })
  @ApiResponse({
    status: 200,
    description: 'Successfully update post information',
  })
  @UseInterceptors(FileInterceptor('image'))
  async updatePost(
    @Param('postId') postId: string,
    @Request() { user: { userId } }: AuthRequest,
    @Body() data: UpdatePostRequestDto,
    @UploadedFile() image?: Express.Multer.File | undefined,
  ) {
    return this.postService.updatePost(postId, userId, {
      ...data,
      image,
    });
  }

  @Patch('/:postId/likes')
  @ApiOperation({ summary: 'Like a Post' })
  @ApiResponse({
    status: 200,
    description: 'Successfully like the post',
  })
  async likePost(
    @Request() { user: { userId } }: AuthRequest,
    @Param('postId') postId: string,
  ) {
    return this.postService.likePost({ postId, userId });
  }

  @Post('/:postId/comments')
  @ApiOperation({ summary: 'insert comments on the posts' })
  @ApiResponse({
    status: 200,
    description: 'Successfully comment on the post',
  })
  async commentPost(
    @Request() { user: { userId } }: AuthRequest,
    @Param('postId') postId: string,
    @Body() commentRequsetDto: CommentPostRequestDto,
  ) {
    return this.postService.addCommentToPost(postId, {
      ...commentRequsetDto,
      author: userId,
    });
  }

  @Delete('/:postId')
  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({
    status: 200,
    description: 'Post Deleted',
  })
  async deletePost(
    @Request() { user: { userId } }: AuthRequest,
    @Param('postId') postId: string,
  ) {
    return this.postService.deletePost({ postId, userId });
  }

  @Get('/')
  @ApiOperation({ summary: 'Get Current User Posts' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrive user post',
  })
  async getUserPosts(@Request() { user: { userId } }: AuthRequest) {
    return this.postService.getUserPost(userId);
  }

  @Get('/search')
  @ApiOperation({ summary: 'Search a post' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrive post by keyword',
  })
  async getPostsBy(@Query('keyword') keyword: string) {
    return this.postService.getPostBy(keyword);
  }

  @Get('/feeds')
  @ApiOperation({ summary: 'Feeds of current user' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrive feeds',
  })
  async getFeeds(@Request() { user: { userId } }: AuthRequest) {
    return this.postService.getUserFeed(userId);
  }
}
