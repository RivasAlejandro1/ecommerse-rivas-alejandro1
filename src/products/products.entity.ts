import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Categories } from "../categories/categories.entity";
import { OrderDetails} from "src/ordersDetails/ordersDetails.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column({
        type: "varchar",
        length: 50,
        nullable: false,
        unique: true
    })
    name: string;

    @Column({
        type: "text",
        nullable: false
    })
    description: string;

    @Column({
        type: "decimal",
        precision: 10,
        scale: 2
    })   
    price: number;

    @Column({
        type: "int",
        nullable: false
    })
    stock: number;
    
    @Column({
        type: "text",
        default: "https://media.istockphoto.com/id/1089643450/es/foto/cart%C3%B3n-de-bo%C3%AEte-en-vide-et-ouverte.jpg?s=1024x1024&w=is&k=20&c=ercOUDSYja38T4FANZ7mNOF_gs7EYnUN9GvFJkSXSfg="
    })
    imgUrl: string;

    
    
    @ManyToOne( ()=> Categories , (category) => category.products)
    category: Categories;

    @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
    @JoinTable({
        name: "products_OrderDetails",
        joinColumn:{
            name: "ordersDetails_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {        
            name: "products_id",
            referencedColumnName: "id"
        }       

    })
    ordersDetails: OrderDetails[];
    /* 

  

category_id  (Relación 1:N).

Relación N:N con orderDetails.*/
}