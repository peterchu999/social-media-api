import { Injectable } from '@nestjs/common';
import { PostRepositoryService } from '../../repositories/post/post.repository.service';
import { CreatePostResponseDto, GetPostsResponseDto } from './dtos/responses';
import { CommentDto, CreatePostDto, UpdatePostDto } from './dtos/repositories';
import { DeletePostDto, LikesPostDto } from './dtos/requests';
import { User } from '../../schemas/User.schema';
import { UserService } from '../user/user.service';

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepositoryService,
    private userService: UserService,
  ) {}

  async createNewPost(
    createPostData: CreatePostDto,
  ): Promise<CreatePostResponseDto> {
    return this.postRepository.create(createPostData);
  }

  async deletePost(deletePostDto: DeletePostDto): Promise<boolean> {
    return this.postRepository.delete(deletePostDto);
  }

  async likePost({ postId, userId }: LikesPostDto) {
    return this.postRepository.insertUniqueUserLikes(postId, userId);
  }

  async addCommentToPost(postId, commentDto: CommentDto) {
    const comment = await this.postRepository.createComment(commentDto);
    return this.postRepository.insertComment(postId, comment);
  }

  async getUserPost(userId: string): Promise<GetPostsResponseDto> {
    const posts = await this.postRepository.getPostByAuthors([userId]);
    return { posts };
  }

  async getUserFeed(userId: string): Promise<GetPostsResponseDto> {
    const { following } = await this.userService.findById(userId);
    const posts = await this.postRepository.getPostByAuthors(following);
    return { posts };
  }

  async getPostBy(keyword: string): Promise<GetPostsResponseDto> {
    const posts = await this.postRepository.getPostByKeyword(keyword);
    return { posts };
  }

  async updatePost(userId: string, postDto: UpdatePostDto) {
    return this.postRepository.update(userId, postDto);
  }
}
