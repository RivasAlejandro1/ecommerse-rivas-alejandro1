import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Order } from './orders.entity';
import { OrdersRepository } from './orders.repository';
import { Product } from 'src/products/products.entity';
import { OrderDetails } from 'src/ordersDetails/ordersDetails.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Order,Product, OrderDetails])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository]
})
export class OrdersModule {}
