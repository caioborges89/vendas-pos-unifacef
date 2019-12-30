import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cliente } from "src/cliente/cliente.entity";
import { Repository } from "typeorm";
import * as jwt from 'jsonwebtoken';
import { AuthenticationRequestDTO } from "./authentication.request.dto";
import { sign } from "jsonwebtoken";

@Injectable()
export class AuthenticationService{
    constructor(
        @InjectRepository(Cliente)
        private readonly clienteRepository:Repository<Cliente>
    ) {}

    async login(authenticationRequestDTO:AuthenticationRequestDTO):Promise<String>{
        let cliente = await this.clienteRepository.findOne({
            where:[{"email":authenticationRequestDTO.email}]
        })

        if(!cliente)
            throw new BadRequestException('E-Mail não localizado');

        if(cliente.senha != authenticationRequestDTO.senha)
            throw new BadRequestException('E-Mail ou Senha inválido');

        const token = this.getToken({
            id: cliente.id,
            email: cliente.email
        });

        return token;
    }

    getToken(payload, options = {}) {
        return jwt.sign(payload, 'stubJWT', { expiresIn: '24h', ...options });
     }
}