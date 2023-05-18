import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { Post } from '../../schemas/Post.schema';
import {
  CommentDto,
  CreatePostDto,
  UpdatePostDto,
} from '../../modules/post/dtos/repositories';
import { User } from 'src/schemas/User.schema';
import { Comment } from 'src/schemas/Comment.schema';
import { DeletePostDto } from 'src/modules/post/dtos/requests';

@Injectable()
export class PostRepositoryService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async create(createPostData: CreatePostDto): Promise<Post> {
    return await this.postModel.create(createPostData);
  }

  async delete({ postId, userId }: DeletePostDto): Promise<boolean> {
    const result = await this.postModel.deleteOne({
      _id: postId,
      author: userId,
    });
    return result.acknowledged;
  }

  async update(userId: string, updatedPost: UpdatePostDto): Promise<Post> {
    return this.postModel.findOneAndUpdate(
      { _id: updatedPost.id, author: userId },
      updatedPost,
      {
        new: true,
      },
    );
  }

  async getPostByAuthors(authors: (User | string)[]): Promise<Post[]> {
    return this.postModel.find({ author: { $in: authors } });
  }

  async getPostByKeyword(keyword: string): Promise<Post[]> {
    return this.postModel.find({
      keywords: keyword,
    });
  }

  async createComment(commentDto: CommentDto): Promise<Comment> {
    return this.commentModel.create(commentDto);
  }

  async insertComment(postId: string, comment: Comment): Promise<Post> {
    return this.postModel
      .findByIdAndUpdate(
        postId,
        {
          $push: { comments: comment },
        },
        { new: true },
      )
      .populate(['likes', 'comments']);
  }

  async insertUniqueUserLikes(postId: string, userId: string): Promise<Post> {
    return this.postModel
      .findOneAndUpdate(
        { _id: postId, 'likes._id': { $nin: [userId] } },
        { $addToSet: { likes: userId } },
        { new: true },
      )
      .populate(['likes', 'comments']);
  }
}
