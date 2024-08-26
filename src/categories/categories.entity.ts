import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../products/products.entity";

@Entity()
export class Categories {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column({
        type: "varchar",
        length: 50,
        nullable: false,
        unique: true
    })
    name: string;

    @OneToMany( ()=> Product, (product) => product.category)
    @JoinColumn()   
    products: Product[];


/* 
   
    
    Relación 1:1 con products. */
}