import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

@Injectable()
export class MonggoDBConfigService {
  protected databaseUri: string;
  protected dbName: string;

  constructor(configService: ConfigService) {
    this.databaseUri = configService.get<string>('DATABASE_URL');
    this.dbName = configService.get<string>('DATABASE_NAME');
  }

  get config(): MongooseModuleOptions {
    return {
      uri: this.databaseUri,
      dbName: this.dbName,
    };
  }
}
