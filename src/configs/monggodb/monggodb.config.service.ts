import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions } from '@nestjs/mongoose';

// TypeOrmModuleOptions;
@Injectable()
export class MonggoDBConfigService {
  protected databaseUri: string;
  protected dbName: string;

  constructor() {
    this.databaseUri = 'mongodb://localhost:27017/social-media';
    this.dbName = 'social-media';
  }

  get config(): MongooseModuleOptions {
    return {
      uri: this.databaseUri,
      dbName: this.dbName,
    };
  }
}
