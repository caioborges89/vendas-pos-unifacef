import { Module } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { AuthenticationController } from "./authentication.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cliente } from "src/cliente/cliente.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Cliente])],
    providers:[AuthenticationService],
    controllers:[AuthenticationController]
})
export class AuthenticationModule{}