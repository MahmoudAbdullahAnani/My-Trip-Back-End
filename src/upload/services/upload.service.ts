import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';
import { Model } from 'mongoose';
import { Users } from 'src/users/interfaces/users.interface';
import streamifier = require('streamifier');
export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

@Injectable()
export class UploadService {
  constructor(
    @Inject('USERS_MODEL')
    private readonly usersModule: Model<Users>,
    private jwtService: JwtService,
  ) {}
  async uploadFile(
    file: Express.Multer.File,
    req,
  ): Promise<CloudinaryResponse> {
    const token = req.headers?.authorization.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    const { _id } = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });

    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    }).then(async (result) => {
      await this.usersModule.findByIdAndUpdate(_id, {
        $set: {
          avatar: result.url,
        },
      });
      return result;
    });
  }
}
