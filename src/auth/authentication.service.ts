import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cliente } from "src/cliente/cliente.entity";
import { Repository } from "typeorm";
import * as jwt from 'jsonwebtoken';
import { AuthenticationRequestDTO } from "./authentication.request.dto";
// import { sign } from "jsonwebtoken";
import { AuthenticationResponseDTO } from "./authentication.response.dto";

@Injectable()
export class AuthenticationService{
    constructor(
        @InjectRepository(Cliente)
        private readonly clienteRepository:Repository<Cliente>
    ) {}

    async login(authenticationRequestDTO:AuthenticationRequestDTO):Promise<AuthenticationResponseDTO>{
        const cliente = await this.clienteRepository.findOne({
            where:[{"email":authenticationRequestDTO.email}]
        })

        if (!cliente)
            throw new NotFoundException('E-Mail não localizado');

        if (cliente.senha != authenticationRequestDTO.senha)
            throw new BadRequestException('E-Mail ou senha inválido(s)');

            const token = this.getToken({
            id: cliente.id,
            email: cliente.email
        });

        let tokenDTO = new AuthenticationResponseDTO();

        tokenDTO.token = token;
        
        return tokenDTO;
    }

    getToken(payload, options = {}) {
        return jwt.sign(payload, 'stubJWT', { expiresIn: '30m', ...options });
     }
}