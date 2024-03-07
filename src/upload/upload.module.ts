import { Module } from '@nestjs/common';
import { UploadController } from './controllers/upload.controller';
import { UploadService } from './services/upload.service';
import { CloudinaryProvider } from './services/cloudinary.provider';
import { DatabaseModule } from 'src/database/database.module';
import { userConnectionProvider } from 'src/users/providers/databaseConnection.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [UploadController],
  providers: [...userConnectionProvider, CloudinaryProvider, UploadService],
  exports: [CloudinaryProvider, UploadService],
})
export class UploadModule {}
