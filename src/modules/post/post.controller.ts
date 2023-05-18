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
  UseGuards,
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
import { UserService } from '../user/user.service';

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
  async createPost(
    @Request() { user: { userId } }: AuthRequest,
    @Body() data: CreatePostRequestDto,
  ) {
    return this.postService.createNewPost({
      ...data,
      author: userId,
    });
  }

  @Patch('/:postId')
  @ApiOperation({ summary: 'Update Post Information' })
  @ApiResponse({
    status: 200,
    description: 'Successfully update post information',
  })
  async updatePost(
    @Param('postId') postId: string,
    @Request() { user: { userId } }: AuthRequest,
    @Body() data: UpdatePostRequestDto,
  ) {
    return this.postService.updatePost(userId, { ...data, id: postId });
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
    description: 'get the list of the current user posts',
  })
  async getUserPosts(@Request() { user: { userId } }: AuthRequest) {
    return this.postService.getUserPost(userId);
  }

  @Get('/search')
  @ApiOperation({ summary: 'Search a post' })
  @ApiResponse({
    status: 200,
    description: 'search post by keyword',
  })
  async getPostsBy(@Query('keyword') keyword: string) {
    return this.postService.getPostBy(keyword);
  }

  @Get('/feeds')
  @ApiOperation({ summary: 'Feeds of current user' })
  @ApiResponse({
    status: 200,
    description: "list of posts from current user and it's following",
  })
  async getFeeds(@Request() { user: { userId } }: AuthRequest) {
    return this.postService.getUserFeed(userId);
  }
}
