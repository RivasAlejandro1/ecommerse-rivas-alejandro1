import { Module } from "@nestjs/common";
import { AuthsController } from "./auths.controller";
import { AuthsService } from "./auths.service";
import { UsersRespository } from "src/users/users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/users.entity";
import { UsersService } from "src/users/users.service";


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [AuthsController],
    providers: [AuthsService, UsersRespository, UsersService]
})
export class AuthsModule{
    
}