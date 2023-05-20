import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { NodeHttpHandler } from '@aws-sdk/node-http-handler';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsService {
  private bucketName: string;
  private awsRegion: string;
  constructor(configService: ConfigService) {
    this.bucketName = configService.get('AWS_BUCKET_NAME');
    this.awsRegion = configService.get<string>('AWS_REGION');
  }

  async uploadFileToS3(
    dataBuffer: Buffer,
    uniqueFileName: string,
  ): Promise<{ Location: string }> {
    const s3clinet = new S3Client({
      region: this.awsRegion,
      requestHandler: new NodeHttpHandler({
        socketTimeout: 10 * 60 * 1000,
      }),
    });

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: uniqueFileName,
      Body: dataBuffer,
    });

    await s3clinet.send(command);

    return {
      Location: `https://${this.bucketName}.s3.amazonaws.com/${uniqueFileName}`,
    };
  }
}
