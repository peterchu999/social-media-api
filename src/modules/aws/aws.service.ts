import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3, config } from 'aws-sdk';

@Injectable()
export class AwsService {
  constructor(private configService: ConfigService) {
    config.update({
      accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      httpOptions: {
        connectTimeout: 20 * 60 * 1000,
        timeout: 20 * 60 * 1000,
      },
    });
  }

  async uploadFileToS3(
    dataBuffer: Buffer,
    uniqueFileName: string,
  ): Promise<S3.ManagedUpload.SendData> {
    const s3 = new S3();

    const uploadResult = await s3
      .upload(
        {
          Bucket: this.configService.get('AWS_BUCKET_NAME'),
          Body: dataBuffer,
          Key: uniqueFileName,
        },
        {
          queueSize: 1,
        },
      )
      .promise();

    return uploadResult;
  }
}
