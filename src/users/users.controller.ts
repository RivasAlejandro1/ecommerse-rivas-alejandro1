import { Controller, Get, Param,Put, Post, Body, Delete, HttpCode, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { authGuard, authGuardToken } from "src/auth/guards/auth.guard";
import { CreateUserDto } from "./user.dto";
import { Roles } from "src/decorators/roles.decorators";
import { Role } from "src/roles.enum";
import { RolesGuard } from "src/auth/guards/authRoles.guard";
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";
import { usersPutExample } from "src/utils/examples";

@ApiTags("users")
@ApiBearerAuth()
@Controller("users")
@UseGuards(authGuardToken)
export class UsersController{
    constructor( private usersService: UsersService){}

    
    @HttpCode(200)
    @Get()
    @Roles(Role.admin)
    @UseGuards(RolesGuard)
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'limit', required: false })
    getUsers(@Query("page") page: number = 1, @Query("limit") limit: number = 5 ){
        return this.usersService.getUsers(page,limit)
    }
    
    @HttpCode(200)
    @Get(":id")
    getUserById(@Param("id") id: string){
        return this.usersService.getUserById(id);
        }
            
    @HttpCode(200)
    @Put(":id")
    @ApiBody(usersPutExample)
    updateUser( @Body() userChanges: Partial<CreateUserDto>, @Param("id") id : string){
        return this.usersService.updateUser(userChanges, id)
        }
        
        
    @HttpCode(200)
    @Delete(":id")
    deleteUser( @Param("id") id : string){
        return this.usersService.deleteUser(id)
        }
        

}