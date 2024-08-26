import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
    constructor(private readonly ordersRepository: OrdersRepository){}

    addOrder(id, products){
        return this.ordersRepository.addOrder(id,products)
    }
    getOrder(id){
        return this.ordersRepository.getOrder(id)
    }
}
