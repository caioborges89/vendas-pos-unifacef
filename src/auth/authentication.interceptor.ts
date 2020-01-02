import { Injectable, ExecutionContext, NestInterceptor, CallHandler, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthenticationInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        if (context && context.switchToHttp() && context.switchToHttp().getRequest() && context.switchToHttp().getRequest().header('Authorization')) {
            let token = context.switchToHttp().getRequest().header('Authorization');
            if (!jwt.verify(token, 'stubJWT', function(err, decoded) {
                if (err) {
                    return false;
                }
                return true;
            })) {
                throw new UnauthorizedException('Autorização inválida');
            }
            return next.handle().pipe();
        } else {
            throw new UnauthorizedException('Autorização não informada');
        }
    }
}