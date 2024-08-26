import { Injectable } from "@nestjs/common";
import* as data from "../utils/data.json"
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { Repository } from "typeorm";
import { Categories } from "src/categories/categories.entity";


/* const Products =  [
    {id: 1, name: 'Product 1', description: 'Description of description 1', price: 10.99, stock: true, imgUrl: 'https://example.com/product1.jpg'},
    {id: 2, name: 'Product 2', description: 'Description of Product 2', price: 19.99, stock: false, imgUrl: 'https://example.com/product2.jpg'},
    {id: 3, name: 'Product 3', description: 'Description of Product 3', price: 29.99, stock: true, imgUrl: 'https://example.com/product3.jpg'},
    {id: 4, name: 'Product 4', description: 'Description of Product 4', price: 15.99, stock: true, imgUrl: 'https://example.com/product4.jpg'},
    {id: 5, name: 'Product 5', description: 'Description of Product 5', price: 24.99, stock: false, imgUrl: 'https://example.com/product5.jpg'},
    {id: 6, name: 'Product 6', description: 'Description of Product 6', price: 12.99, stock: true, imgUrl: 'https://example.com/product6.jpg'},
    {id: 7, name: 'Product 7', description: 'Description of Product 7', price: 34.99, stock: true, imgUrl: 'https://example.com/product7.jpg'},
    {id: 8, name: 'Product 8', description: 'Description of Product 8', price: 27.99, stock: false, imgUrl: 'https://example.com/product8.jpg'},
    {id: 9, name: 'Product 9', description: 'Description of Product 9', price: 19.99, stock: true, imgUrl: 'https://example.com/product9.jpg'},
    {id: 10, name: 'Product 10', description: 'Description of Product 10', price: 39.99, stock: true, imgUrl: 'https://example.com/product10.jpg'}
] */
@Injectable()
export class ProductsRespository {
    constructor(
        @InjectRepository(Product) private productRepositoryDB: Repository<Product>, 
        @InjectRepository(Categories) private categoriesRepositoryDB: Repository<Categories>){
    }

     async seederProduct(){
        const categories = await this.categoriesRepositoryDB.find();

        data?.map( async pro =>{
            
            const newProduct = new Product();


            const category = categories.find(
                (category) => category.name === pro.category
            )

            newProduct.name = pro.name;
            newProduct.description = pro.description;
            newProduct.price = pro.price;
            newProduct.stock = pro.stock;
            newProduct.imgUrl = pro.imgUrl;
            newProduct.category = category;

            console.log(pro.category)
            console.log(category)


            await this.productRepositoryDB.createQueryBuilder()
            .insert()
            .into(Product)
            .values(newProduct)
            .orUpdate(["description", 'price', 'imgUrl', 'stock'], ['name'])
            .execute()
        })

        return " All Products have been added."


    }
    async getProducts(page, limit){
        
        const start = (page-1) * limit;
        const  end = start+limit;
        const allProducts = await this.productRepositoryDB.find();
        const productsPagination = allProducts.slice(start, end);
        return productsPagination;
        
    }
    async getProductById(id: string){
        const productFinded = await this.productRepositoryDB.findOneBy({id: id}) 
        return productFinded;
    }
    async createProduct( product: Partial<Product>){
        const productInstance = this.productRepositoryDB.create(product)
        const newProduct = await this.productRepositoryDB.save(productInstance)
        const productFinded = await this.productRepositoryDB.findOne({
            where: {id: newProduct.id}
        })
        return productFinded;    
    }
    async updateProduct( productChanges: Partial<Product>, id : string): Promise<Product>{

        const productCreated = this.productRepositoryDB.create({...productChanges, id})
        await this.productRepositoryDB.save(productCreated);
        const  findProduct= await this.productRepositoryDB.findOneBy({id: id });
        
        return findProduct 
    }
    async deleteProduct(id : string){
        const deleteProduct =  await this.productRepositoryDB.findOne({
            where: {id: id}
        })  
        await this.productRepositoryDB.delete(deleteProduct)
       
        return deleteProduct;
    }
}