import { Injectable, ExecutionContext, NestInterceptor, CallHandler, BadRequestException } from "@nestjs/common";
import { Observable } from "rxjs";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthenticationInterceptor implements NestInterceptor {
    
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        console.log(request.header('Authorization'));

        if(context && context.switchToHttp() && context.switchToHttp().getRequest() && context.switchToHttp().getRequest().header('Authorization')) {
            let token = context.switchToHttp().getRequest().header('Authorization');
            if(!jwt.verify(token, 'stubJWT', function(err, decoded) {
                if (err) 
                    return false;
                
                return true;
            }))
                throw new BadRequestException('Autorização inválida');

            return next.handle().pipe();
        }
        else 
            throw new BadRequestException('Necessário informar uma Autorização');
    }
}