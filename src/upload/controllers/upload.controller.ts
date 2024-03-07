import {
  Controller,
  //   FileTypeValidator,
  //   MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { UploadService } from '../services/upload.service';
import { UsersGuard } from 'src/users/guards/users.guard';
import { Roles } from 'src/users/guards/roles.decorator';
@Controller('upload')
@UseGuards(UsersGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // @Desc any user can upload avatar
  // @Route POST /upload
  // @Access ['admin', 'manger', 'user']
  @Post()
  @Roles(['admin', 'manger', 'user'])
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @UploadedFile(
      new ParseFilePipe({
        // validators: [
        //   new MaxFileSizeValidator({ maxSize: 1000 }),
        //   new FileTypeValidator({ fileType: 'image/jpeg' }),
        // ],
      }),
    )
    file: Express.Multer.File,
    @Request() req,
  ) {
    return this.uploadService.uploadFile(file, req);
  }
}
