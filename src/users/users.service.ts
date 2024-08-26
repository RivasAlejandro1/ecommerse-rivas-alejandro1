import { Injectable } from "@nestjs/common";
import { UsersRespository } from "./users.repository";
import { User } from "./users.entity";


@Injectable()
export class UsersService{
    constructor(private readonly usersRepository: UsersRespository){}
    getUsers(page, limit){
        return this.usersRepository.getUsers(page, limit);
    }

    async createUser( user: Partial<User>){
        
        return await this.usersRepository.createUser(user);   
    }
    updateUser(userChanges: any, id : string){
        return this.usersRepository.updateUser(userChanges, id)
    }
    deleteUser( id : string){
        return this.usersRepository.deleteUser(id)
    }
    getUserById( id: string){
        return this.usersRepository.getUserById(id);
    }
    getUserByEmail( email: string){
        return this.usersRepository.getUserByEmail(email);
    }
}