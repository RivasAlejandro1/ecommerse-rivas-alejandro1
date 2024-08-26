import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { ProductsRespository } from "./products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { Categories } from "src/categories/categories.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Product, Categories])],
    controllers: [ProductsController],
    providers: [ProductsService, ProductsRespository]
})
export class ProductsModule{
    
}