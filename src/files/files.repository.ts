import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Files } from './files.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/products.entity';
import { UploadApiResponse, v2 } from 'cloudinary';
import toStream = require("buffer-to-stream")

@Injectable()
export class FilesRepository {
    constructor (
        @InjectRepository(Files) private readonly filesRepositoryDB : Repository<Files>,
        @InjectRepository(Product) private readonly productsRepositoryDB: Repository<Product> 
    ){}

    async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse>{
        return new Promise((resolve, reject) =>{
            const upload = v2.uploader.upload_stream({resource_type: "auto"}, (error, result) => {
                if (error){
                    reject(error)
                }else {
                    resolve(result)
                }   
            })
            toStream(file.buffer).pipe(upload);
        })
    }
}
