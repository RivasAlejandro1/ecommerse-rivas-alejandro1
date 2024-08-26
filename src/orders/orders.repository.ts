import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { Product } from 'src/products/products.entity';
import { OrderDetails } from 'src/ordersDetails/ordersDetails.entity';
@Injectable()
export class OrdersRepository {
    constructor(
        @InjectRepository(User) private usersRespositoryDB: Repository<User>, 
        @InjectRepository(Order)  private ordersRepositoryDB: Repository<Order>,
        @InjectRepository(Product) private productRespositoryDB: Repository<Product>,
        @InjectRepository(OrderDetails) private orderDetailsRespositoryDB: Repository<OrderDetails>
    ){}
    
    async addOrder(id, products){



        const userFinded = await this.usersRespositoryDB.findOneBy({id: id})
        if (!userFinded) throw new BadRequestException(`Usuario con el id ${id} no se encuentra en la DB`)



        const newOrder = new Order();
        newOrder.date = new Date();
        newOrder.user = userFinded;

        const newOrderDetails = new OrderDetails();
        let totalPrice : number = 0;
        

        console.log("TODOS LOS PRODUCTOS: ", products);
        newOrderDetails.products =  await products.map( async product =>{


                console.log("PRODUCTO: ",product)
                const productFinded = await this.productRespositoryDB.findOneBy({id: product.id});
                
                console.log("PRODUCTO FINDED: ",productFinded)
                if(!productFinded.stock) return ;
                
                console.log("Price: ", productFinded.price)
                totalPrice = totalPrice + Number(productFinded.price);
                console.log("TotalPrice: ", totalPrice)
                await this.productRespositoryDB
                .createQueryBuilder()
                .update(Product)
                .set( { stock: productFinded.stock-1})
                .where( "id = :id ", {id: product.id})
                .execute()
                


                return productFinded;
                
            })
         
         

            console.log("Total ",totalPrice)
            newOrderDetails.price = Number(Number(totalPrice).toFixed(2));
            console.log("orderprice", newOrderDetails.price)
            
         newOrder.orderDetails = await this.orderDetailsRespositoryDB.save(newOrderDetails);
         await this.ordersRepositoryDB.save(newOrder);

         return await this.ordersRepositoryDB.find({
            where: {id: newOrder.id},
            relations: {
                orderDetails: true      
            },
         })

    }
    async getOrder(id){
        const orderFinded  = await this.ordersRepositoryDB.findOne({
            where: {id: id},
            relations: {
                orderDetails: {
                    products: true
                }
            }
        })

        if (!orderFinded) return "No finded an order"
        return orderFinded;
    }
}
