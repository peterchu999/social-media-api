import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { PostRepositoryService } from '../../repositories/post/post.repository.service';
import { AwsService } from '../aws/aws.service';
import { UserService } from '../user/user.service';
import { CommentDto, UpdatePostDto } from './dtos/repositories';
import {
  CreatePostRequestDto,
  DeletePostDto,
  LikesPostDto,
  UpdatePostRequestDto,
} from './dtos/requests';
import { CreatePostResponseDto, GetPostsResponseDto } from './dtos/responses';

@Injectable()
export class PostService {
  constructor(
    private awsService: AwsService,
    private postRepository: PostRepositoryService,
    private userService: UserService,
  ) {}

  async createNewPost(
    createPostData: CreatePostRequestDto,
  ): Promise<CreatePostResponseDto> {
    const { image } = createPostData;

    const { Location } = await this.awsService.uploadFileToS3(
      image.buffer,
      `posts/${uuid()}`,
    );

    return this.postRepository.create({
      ...createPostData,
      imageUrl: Location,
    });
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

  async updatePost(
    postId: string,
    userId: string,
    { image, ...postData }: UpdatePostRequestDto,
  ) {
    const postDto: UpdatePostDto = { ...postData, id: postId };

    if (image) {
      const { Location } = await this.awsService.uploadFileToS3(
        image.buffer,
        `posts/${uuid()}`,
      );
      postDto.imageUrl = Location;
    }

    return this.postRepository.update(userId, postDto);
  }
}
