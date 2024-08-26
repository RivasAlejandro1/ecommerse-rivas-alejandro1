import { BadRequestException, Body, Controller, Get, Headers, HttpCode, NotFoundException, Post, UseGuards } from "@nestjs/common";
import { AuthsService } from "./auths.service";
import { CreateUserDto, LoginUserDto } from "src/users/user.dto";
import { authGuardToken } from "./guards/auth.guard";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import {  signinExample, signupExample } from "src/utils/examples";

@ApiTags("auth")
@Controller("auth")
export class AuthsController{
    constructor( 
        private readonly authsService: AuthsService  
    ){}

  
    @Post("signin")
    @ApiBody(signinExample)
    signin(@Body() credentials: LoginUserDto ){
        const {email, password} = credentials;  
        return  this.authsService.signin(email, password)
    }

    @HttpCode(201)
    @Post("signup")
    @ApiBody(signupExample)
    signup( @Body() user: CreateUserDto){
        if(user.password !== user.confirmationPassword) throw new BadRequestException("The passwords do not match")
        const {confirmationPassword, ...userClean} = user 


        return this.authsService.singup(userClean);   
    }

}