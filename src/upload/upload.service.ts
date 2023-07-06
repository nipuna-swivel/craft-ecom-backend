import { Injectable, Logger } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { nanoid } from 'nanoid';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);
  private s3;
  private bucketName = process.env.AWS_BUCKET_NAME;

  constructor() {
    this.s3 = new S3Client({
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      this.logger.log(`Upload file to s3 ${file.originalname}`);

      //generate unique key for file
      const id = nanoid();
      const key = `${id}-${file.originalname}`;

      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: file.buffer,
        ACL: 'public-read',
      });

      await this.s3.send(command);

      //return url of file
      return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
    } catch (e) {
      this.logger.error('Upload file to s3 error', e.message);
      throw new Error(e);
    }
  }
}
