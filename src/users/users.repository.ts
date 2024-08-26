import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { Order } from "src/orders/orders.entity";
import { Role } from "src/roles.enum";



/* const Users = [
    {id: 1, email: 'user1@example.com', name: 'User One', password: 'password1', address: '123 Street', phone: '123-456-7890', country: 'Country1', city: 'City1'},
    {id: 2, email: 'user2@example.com', name: 'User Two', password: 'password2', address: '456 Avenue', phone: '987-654-3210', country: 'Country2', city: 'City2'},
    {id: 3, email: 'user3@example.com', name: 'User Three', password: 'password3', address: '789 Road', phone: '555-123-4567', country: 'Country3', city: 'City3'},
    {id: 4, email: 'user4@example.com', name: 'User Four', password: 'password4', address: '321 Lane', phone: '111-222-3333', country: 'Country4', city: 'City4'},
    {id: 5, email: 'user5@example.com', name: 'User Five', password: 'password5', address: '555 Boulevard', phone: '999-888-7777', country: 'Country5', city: 'City5'},
    {id: 6, email: 'user6@example.com', name: 'User Six', password: 'password6', address: '777 Court', phone: '444-555-6666', country: 'Country6', city: 'City6'},
    {id: 7, email: 'user7@example.com', name: 'User Seven', password: 'password7', address: '999 Circle', phone: '777-888-9999', country: 'Country7', city: 'City7'},
    {id: 8, email: 'user8@example.com', name: 'User Eight', password: 'password8', address: '111 Square', phone: '222-333-4444', country: 'Country8', city: 'City8'},
    {id: 9, email: 'user9@example.com', name: 'User Nine', password: 'password9', address: '222 Oval', phone: '888-999-0000', country: 'Country9', city: 'City9'},
    {id: 10, email: 'user10@example.com', name: 'User Ten', password: 'password10', address: '333 Triangle', phone: '666-777-8888', country: 'Country10', city: 'City10'}
] */
@Injectable()
export class UsersRespository {
    constructor( @InjectRepository(User) private readonly usersRespositoryDB: Repository<User>){}
    
    async getUsers(page, limit): Promise<Omit<User, "password">[]>{
        const start = (page-1) * limit;
        const  end = start+limit;
        const allUsers = await this.usersRespositoryDB.find({relations:{ orders: true}})
        const usersPagination = allUsers.slice(start, end);

        const usersWithOutPassword = usersPagination.map( user => {
            const {  password, ...withoutPassword } =  user
            return withoutPassword
        })
        return usersWithOutPassword;
    }

    async createUser( user: Partial<User>): Promise<Omit<User, "password" | "isAdmin">>{

        const firstUser = await this.usersRespositoryDB.find()
        const userInstance = this.usersRespositoryDB.create(user)
        userInstance.isAdmin = Role.user
        if(!firstUser.length) userInstance.isAdmin = Role.admin
        const newUser = await this.usersRespositoryDB.save(userInstance)
        const userFinded = await this.usersRespositoryDB.findOne({
            where: {id: newUser.id},
            relations: {
                orders: true
            }
        })
        
        const { password, isAdmin,  ...withoutPassword} = userFinded;
        return withoutPassword;   
    }

    async updateUser(userChanges: any, id : string): Promise<Omit<User, "password" | "isAdmin">>{
        await this.usersRespositoryDB.update({id: id }, userChanges)
        const userFinded = await this.usersRespositoryDB.findOneBy({ id: id})

        const { password, isAdmin, ...withoutPassword} = userFinded
        return withoutPassword
    }
    async deleteUser( id : string): Promise<Omit<User, "password" | "isAdmin">>{

        const deleteUser =  await this.usersRespositoryDB.findOneBy({id: id})  
        await this.usersRespositoryDB.delete(deleteUser)
        const { password, isAdmin, ...withoutPassword} = deleteUser
        return withoutPassword;
    }
    async getUserById( id: string): Promise<Omit<User, "password" | "isAdmin">>{
        const userFinded = await this.usersRespositoryDB.findOne({
            where: {id: id},
            relations: {
                orders: true
            }
        }) 
        const  { password, isAdmin,  ...withoutPassword  } = userFinded;
        return withoutPassword;
    }

    async getUserByEmail( email: string): Promise<User>{
        return await this.usersRespositoryDB.findOne({
            where: {email: email},
            relations: {
                orders: true
            }
        }) 
    }
}