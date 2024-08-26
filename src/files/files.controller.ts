import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { authGuardToken } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags("files")
@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService){}
    
    @ApiBearerAuth()
    @Post("uploadImage/:id")
    @UseGuards(authGuardToken)
    @UseInterceptors(FileInterceptor("file"))
    @ApiBody({
        description: 'Image file to upload',
        required: true,
        type: 'formData',
        schema: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      })
    uploadImage(@Param("id") id : string , @UploadedFile(new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({
                maxSize: 200000,
                message: "The file must be less than or equal than 200kb"
            }),
            new FileTypeValidator({
                fileType: /(jpg|jpeg|png|webp|gif|svg)/
            })
        ]
    })) file: Express.Multer.File){
        return this.filesService.uploadImage(id, file)
    }
}
