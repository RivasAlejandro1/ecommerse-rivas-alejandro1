import { Type } from "class-transformer";
import { ArrayContains, ArrayMinSize, IsArray, IsDefined, IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, IsUUID, Length, ValidateIf, ValidateNested, arrayContains, isDefined, isString } from "class-validator";
import { Product } from "src/products/products.entity";



export class CreateOrderDto   {

    @IsDefined()
    @IsNotEmpty()
    @IsUUID()
    userId: string;
    name: string;

    @IsArray()
    @ArrayMinSize(1)
    products: Partial<Product[]>;



}