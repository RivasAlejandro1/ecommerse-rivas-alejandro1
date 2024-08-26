import { Product } from "src/products/products.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderDetails {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column({
        type: "decimal",
        precision: 10,
        scale: 2,
        nullable: false
    })
    price: number;

    @ManyToMany(()=> Product, (product) => product.ordersDetails)
    products: Product[];

/* 
order_id: Relación 1:1 con orders.

Relación N:N con products.
*/
}