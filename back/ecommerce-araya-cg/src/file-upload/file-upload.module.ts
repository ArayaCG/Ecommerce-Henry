import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { CloudinaryConfig } from '../config/cloudinary';
import { FileUpLoadRepository } from './file-upload.repositoy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../entities/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [FileUploadController],
  providers: [FileUploadService, CloudinaryConfig, FileUpLoadRepository],
})
export class FileUploadModule {}
