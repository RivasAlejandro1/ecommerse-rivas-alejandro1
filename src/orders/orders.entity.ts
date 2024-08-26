import { OrderDetails } from "src/ordersDetails/ordersDetails.entity";
import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    
    @Column()
    date: Date;

    
    @ManyToOne(() => User, (user) => user.orders)
    user: User

    @OneToOne(() => OrderDetails)
    @JoinColumn()
    orderDetails: OrderDetails;


}