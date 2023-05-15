import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards';

@UseGuards(JwtAuthGuard)
@ApiTags('posts')
@ApiBearerAuth()
@Controller('posts')
export class PostController {
  @Post('/')
  @ApiOperation({ summary: 'create new post' })
  @ApiResponse({
    status: 201,
    description: 'Successfully Create New Posts',
  })
  async createPost() {
    // insert new post data
  }

  @Patch('/:postId')
  @ApiOperation({ summary: 'Update Post Information' })
  @ApiResponse({
    status: 200,
    description: 'Successfully update post information',
  })
  async updatePost() {
    // update post data
  }

  @Patch('/:postId/likes')
  @ApiOperation({ summary: 'Like a Post' })
  @ApiResponse({
    status: 200,
    description: 'Successfully like the post',
  })
  async likePost() {
    // insert user to the post likes
  }

  @Post('/:postId/comments')
  @ApiOperation({ summary: 'insert comments on the posts' })
  @ApiResponse({
    status: 200,
    description: 'Successfully comment on the post',
  })
  async commentPost() {
    // insert comments on the posts
  }

  @Delete('/:postId')
  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({
    status: 200,
    description: 'Post Deleted',
  })
  async deletePost() {
    // delete data
  }

  @Get('/')
  @ApiOperation({ summary: 'Search a post' })
  @ApiResponse({
    status: 200,
    description: 'Post Deleted',
  })
  async getPosts(@Query('keyword') keyword: string) {
    // get post by queryParam keyword
  }
}
