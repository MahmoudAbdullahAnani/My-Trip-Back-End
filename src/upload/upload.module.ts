import { Module } from '@nestjs/common';
import { UploadController } from './controllers/upload.controller';
import { UploadService } from './services/upload.service';
import { CloudinaryProvider } from './services/cloudinary.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [DatabaseModule,UploadController],
  providers: [CloudinaryProvider, UploadService],
  exports: [CloudinaryProvider, UploadService],
})
export class UploadModule {}
