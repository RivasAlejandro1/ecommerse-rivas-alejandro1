import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "src/roles.enum";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector){}

    canActivate(context: ExecutionContext ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const requiredRoles = this.reflector.getAllAndOverride<Role[]>("roles", [context.getHandler(), context.getClass()]);

        console.log(this.reflector, "-> reflector")
        console.log(requiredRoles, " -> required Roles")
        console.log(context.getHandler(), " -> context.getHandler()")
        console.log(context.getClass(), " -> context.getClass()")

        const hasRole = () => requiredRoles.some((role) => user?.isAdmin?.includes(role))
        if(!hasRole()) throw new ForbiddenException()
        
        return true
    }
}