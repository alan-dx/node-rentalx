import { S3 } from 'aws-sdk';
import fs from 'fs';
import mime from 'mime';
import { resolve } from 'path';

import upload from '@config/upload';

import { IStorageProvider } from '../IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    });
  }

  async save(filename: string, folder: string): Promise<string> {
    const originalNamePath = resolve(upload.tmpFolder, filename);

    const fileContent = await fs.promises.readFile(originalNamePath);

    await this.client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`, // Folder is = avatar or cars
        Key: filename,
        // ACL: 'public-read',
        Body: fileContent,
        ContentType: mime.getType(originalNamePath),
      })
      .promise();

    await fs.promises.unlink(originalNamePath); // Remove o arquivo da pasta tmp

    return filename;
  }

  async delete(filename: string, folder: string): Promise<void> {
    // Folder is = avatar or cars
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: filename,
      })
      .promise();
  }
}

export { S3StorageProvider };
