import { Injectable } from '@nestjs/common';
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';
import streamifier = require('streamifier');
export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

@Injectable()
export class UploadService {
  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {

    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
