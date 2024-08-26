import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { authGuard, authGuardToken } from "src/auth/guards/auth.guard";
import { Roles } from "src/decorators/roles.decorators";
import { Role } from "src/roles.enum";
import { RolesGuard } from "src/auth/guards/authRoles.guard";
import { Product } from "./products.entity";
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Any } from "typeorm";
import { productsExample } from "src/utils/examples";

@ApiTags("products")
@Controller("products")
export class ProductsController{
    constructor( private productsService: ProductsService){}

    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'limit', required: false })
    @HttpCode(200)  
    @Get()
    getProducts(@Query("page") page: number = 1, @Query("limit") limit: number = 5 ){
        return this.productsService.getProducts(page, limit)
    }
    
    
    @Get("seeder")
    seederProduct(){
        return this.productsService.seederProduct()
    }
    

    @ApiBearerAuth()
    @HttpCode(201)
    @Post()
    @UseGuards(authGuardToken)
    @ApiBody(productsExample)
    createProduct( @Body() product: any){
        return this.productsService.createProduct(product);   
    }
    
    
    @HttpCode(200)
    @Get(":id")
    //@UseGuards(authGuard)
    async getProductById(@Param("id") id: string){
        return  await this.productsService.getProductById(id);
    }
    


    @ApiBearerAuth()
    @HttpCode(200)
    @Put(":id")
    @Roles(Role.admin)
    @UseGuards(authGuardToken, RolesGuard)
    @ApiBody(productsExample)
    async updateProduct( @Body() productChanges: Partial<Product>, @Param("id") id : string){
        return this.productsService.updateProduct(productChanges, id)
    }
    
   
    @HttpCode(200)
    @Delete(":id")
    //@UseGuards(authGuard)
    deleteProduct( @Param("id") id : string){
        return this.productsService.deleteProduct(id)
    }

   
}
