import { Injectable, NotFoundException } from '@nestjs/common';
import { FilesRepository } from './files.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
    constructor( 
        private readonly filesRepository: FilesRepository,
        @InjectRepository(Product) private readonly productsRepositoryDB : Repository<Product>
    ){}

    async uploadImage(id:string, file: Express.Multer.File){
         const productFinded = await this.productsRepositoryDB.findOneBy({id: id})
        
         if(!productFinded) throw new NotFoundException("Product not found")

         const fileCloudinary = await this.filesRepository.uploadImage(file);
        
        
         await this.productsRepositoryDB.update({id:id}, {imgUrl: fileCloudinary.secure_url})
        return `The img was updated to https://res.cloudinary.com/dl6lreues/image/upload/v1717603116/egl79oxdg6wewosryi0s.jpg
        And saved in DB `
    }

}
