import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { FilesRepository } from './files.repository';
import { cloudinaryConfig } from 'src/config/cloudinary';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Files } from './files.entity';
import { Product } from 'src/products/products.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Files, Product])],
  controllers: [FilesController],
  providers: [FilesService, FilesRepository, cloudinaryConfig]
})
export class FilesModule {}
