import { CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { Observable } from "rxjs";


@Injectable()
export class authGuardNoIsAdmin implements CanActivate {
    
    canActivate( context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{
        
        const  request = context.switchToHttp().getRequest()
        if(request.user?.isAdmin){
            console.log( "paso")
            throw new NotFoundException(" an error has ocurred")
        }
        return true
    }
    
}