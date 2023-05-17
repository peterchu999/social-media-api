import { Injectable } from '@nestjs/common';
import { PostRepositoryService } from '../../repositories/post/post.repository.service';
import { CreatePostResponseDto, GetPostsResponseDto } from './dtos/responses';
import { CommentDto, CreatePostDto, UpdatePostDto } from './dtos/repositories';
import { DeletePostDto, LikesPostDto } from './dtos/requests';
import { User } from '../../schemas/User.schema';

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepositoryService) {}

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

  async getPostBy(keyword: string): Promise<GetPostsResponseDto> {
    const posts = await this.postRepository.getPostByKeyword(keyword);
    return { posts };
  }

  async updatePost(postDto: UpdatePostDto) {
    return this.postRepository.update(postDto);
  }
}
