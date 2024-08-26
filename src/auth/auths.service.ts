import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from "bcrypt"
import { User } from "src/users/users.entity";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthsService{
    constructor ( 
        private readonly usersService: UsersService ,
        private readonly jwtService: JwtService
    ){}
    
  
    async signin(email: string, password: string){
        if(!email || !password) return "email and password required"



        const authUser =  await this.usersService.getUserByEmail(email)
        if(!authUser) throw new NotFoundException("The credentials are wrong")

        const authPassword = await bcrypt.compare(password, authUser.password )
        if(!authPassword) throw new NotFoundException("The credentials are wrong")
        

        const userPayload = {
            sub: authUser.id,
            id: authUser.id,
            email: authUser.email,
            isAdmin: authUser.isAdmin
        }
        const token = await this.jwtService.sign(userPayload)
        return {success: "User logged is successfully", token};
    }

    async singup(user: Partial<User>){
        

        const userFinded = await this.usersService.getUserByEmail(user.email);
        if(userFinded) throw new BadRequestException("This user was registed")
       
        const passwordHashed =  await bcrypt.hash(user.password, 10);
        const newUser = {...user, password: passwordHashed};



        return await this.usersService.createUser(newUser);

    }
}