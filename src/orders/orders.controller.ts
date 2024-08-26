import { Body, Controller, Get, Injectable, Param, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './order.dto';
import { authGuardToken } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { ordersExample } from 'src/utils/examples';
@ApiTags("orders")
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService){

    }

    @ApiBearerAuth()
    @Get(":id")
    @UseGuards(authGuardToken)
    getOrder(@Param("id") id:string){
        return this.ordersService.getOrder(id)
    }
    @ApiBearerAuth()
    @Post()
    @UseGuards(authGuardToken)
    @ApiBody(ordersExample)
    shoppingCart(@Body() order: CreateOrderDto){
        const userid :string = order.userId;
        const products = order.products;

        return this.ordersService.addOrder(userid, products)
    }

}

