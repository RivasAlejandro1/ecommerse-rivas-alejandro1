import { Order } from "src/orders/orders.entity";
import { Role } from "src/roles.enum";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "users"
})
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column({
        type: "enum",
        enum: Role,
        default: Role.user
    })
    isAdmin: Role;
    @Column({
        type: "varchar",
        length: 50,
        nullable: false
    })
    name: string;

    @Column({
        type: "varchar",
        unique: true,
        length: 50,
        nullable: false
    })
    email: string;

    @Column({
        type: "varchar",
        length: 60,
        nullable: false
    })   
    password: string;

    @Column({
        type: "int",
        nullable: false
    })
    phone: number;
    
    @Column({
        type: "varchar",
        length: 50
    })
    country: string;

    @Column({
        type: "text"
    })
    address: string;

    @Column({
        type: "varchar",
        length: 50
    })
    city: string;

    @OneToMany(() => Order, (order) => order.user)
    @JoinColumn({name: "orders_id"})
    orders: Order[]

  /* 

    orders_id: Relación 1:N con orders. */
}