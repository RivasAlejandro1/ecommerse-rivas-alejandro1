import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
import { Role } from "src/roles.enum";
import { UsersService } from "src/users/users.service";

function validateRequest(request: Request){
    
    const authHeader = request.headers.authorization

    if(!authHeader) return false

    const [basic, email, password] = authHeader.split(":");

    if(!email || !password) return false;

    return true;
}


@Injectable()
export class authGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
       return validateRequest(request)
    }
   
} 

@Injectable()
export class authGuardToken implements CanActivate{
    constructor( 
        private readonly jwtService:JwtService
    ){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        const token = request.headers.authorization?.split(" ")[1];
        if(!token) throw new NotFoundException("Bearer Token not found")
        
        try{
            const secret = process.env.JWT_SECRET
            const payload = this.jwtService.verify(token, {secret: secret})
            payload.exp = new Date(payload.exp * 1000)
            payload.iat = new Date(payload.ait * 1000)
            
            request.user = payload

            
            console.log(payload, "payload")
            console.log(request.user)
            
            
            
            return true;

        }catch(err){
            throw new UnauthorizedException("Invalid Token")
        }
    }
}