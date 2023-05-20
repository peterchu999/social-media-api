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
import {
  CreatePostResponseDto,
  GetPostsResponseDto,
  LikePostResponseDto,
} from './dtos/responses';
import { plainToInstance } from 'class-transformer';
import { CommentPostResponseDto } from './dtos/responses';
import { UpdatePostResponseDto } from './dtos/responses';

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

    return plainToInstance(
      CreatePostResponseDto,
      await this.postRepository.create({
        ...createPostData,
        imageUrl: Location,
      }),
      { excludeExtraneousValues: true },
    );
  }

  async deletePost(deletePostDto: DeletePostDto): Promise<boolean> {
    return this.postRepository.delete(deletePostDto);
  }

  async likePost({
    postId,
    userId,
  }: LikesPostDto): Promise<LikePostResponseDto> {
    return plainToInstance(
      LikePostResponseDto,
      await this.postRepository.insertUniqueUserLikes(postId, userId),
      { excludeExtraneousValues: true },
    );
  }

  async addCommentToPost(postId, commentDto: CommentDto) {
    const comment = await this.postRepository.createComment(commentDto);
    return plainToInstance(
      CommentPostResponseDto,
      await this.postRepository.insertComment(postId, comment),
      { excludeExtraneousValues: true },
    );
  }

  async getUserPost(userId: string): Promise<GetPostsResponseDto> {
    const posts = await this.postRepository.getPostByAuthors([userId]);
    return plainToInstance(
      GetPostsResponseDto,
      { posts },
      { excludeExtraneousValues: true },
    );
  }

  async getUserFeed(userId: string): Promise<GetPostsResponseDto> {
    const { following } = await this.userService.findById(userId);
    const posts = await this.postRepository.getPostByAuthors(following);
    return plainToInstance(
      GetPostsResponseDto,
      { posts },
      { excludeExtraneousValues: true },
    );
  }

  async getPostBy(keyword: string): Promise<GetPostsResponseDto> {
    const posts = await this.postRepository.getPostByKeyword(keyword);
    return plainToInstance(
      GetPostsResponseDto,
      { posts },
      { excludeExtraneousValues: true },
    );
  }

  async updatePost(
    postId: string,
    userId: string,
    { image, ...postData }: UpdatePostRequestDto,
  ): Promise<UpdatePostResponseDto> {
    const postDto: UpdatePostDto = { ...postData, id: postId };

    if (image) {
      const { Location } = await this.awsService.uploadFileToS3(
        image.buffer,
        `posts/${uuid()}`,
      );
      postDto.imageUrl = Location;
    }

    return plainToInstance(
      UpdatePostResponseDto,
      await this.postRepository.update(userId, postDto),
      { excludeExtraneousValues: true },
    );
  }
}
