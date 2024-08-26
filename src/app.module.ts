import {  Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthsModule } from './auth/auths.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import typeOrmConfig from './config/typeorm'
import { FilesModule } from './files/files.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(configService: ConfigService) => configService.get('typeorm')
    }),
    UsersModule, 
    ProductsModule,
    AuthsModule,
    CategoriesModule,
    OrdersModule, 
    FilesModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: "1h"},
      secret: process.env.JWT_SECRET
    })
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
