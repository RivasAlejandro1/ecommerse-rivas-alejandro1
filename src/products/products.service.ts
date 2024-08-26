import { Injectable } from "@nestjs/common";
import { ProductsRespository } from "./products.repository";
import { Product } from "./products.entity";



@Injectable()
export class ProductsService{
    constructor( private productsRepository: ProductsRespository){}
    async getProducts(page, limit){
        return await this.productsRepository.getProducts(page, limit);
    }
    async seederProduct(){
        return await this.productsRepository.seederProduct();
    }
    async getProductById(id: string){
        return await this.productsRepository.getProductById(id);
    }
    async createProduct( product: any){
        return await this.productsRepository.createProduct(product);   
    }
    async updateProduct( productChanges: Partial<Product>, id : string ):Promise<Product>{
        return await this.productsRepository.updateProduct(productChanges, id)
    }
    
    async deleteProduct(id : string){
        return await this.productsRepository.deleteProduct(id)
    }

}