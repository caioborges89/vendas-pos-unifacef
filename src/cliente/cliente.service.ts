import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './cliente.entity';
import { Repository } from 'typeorm';
import { ClienteRequestDTO } from './cliente.request.dto';

@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(Cliente)
        private readonly clienteRepository: Repository<Cliente>
    ) { }

    async findAll(): Promise<Cliente[]>{
        const clientes = await this.clienteRepository.find({
            where: [{"isActive":true}]
        })
        if (!clientes || clientes.length == 0) {
            throw new NotFoundException("Clientes não encontrados!");
        }
        return clientes;
    }

    async findOne(id: number): Promise<Cliente>{
        const cliente = await this.clienteRepository.findOne(id);
        if (!cliente || !cliente.isActive) {
            throw new NotFoundException("Cliente não encontrado!");
        }
        return cliente;
    }

    async create(clienteDTO:ClienteRequestDTO): Promise<Cliente>{
        if (!clienteDTO)
            throw new BadRequestException('Dados nulos.');
        
        let cliente = await this.clienteRepository.findOne({
            where: [{"cpfcnpj":clienteDTO.cpfcnpj}]
        });
        
        if (cliente)
            throw new BadRequestException('CpfCnpj incluso em outro cadastro de Cliente/Usuario.');

        cliente = await this.clienteRepository.findOne({
            where: [{"email":clienteDTO.email}]
        });

        if (cliente)
            throw new BadRequestException('E-Mail incluso em outro cadastro de Cliente/Usuario.');
       
        try {
            cliente = new Cliente();
            cliente.nome = clienteDTO.nome;
            cliente.cpfcnpj = clienteDTO.cpfcnpj;
            cliente.email = clienteDTO.email;
            cliente.senha = clienteDTO.senha;
        
            await this.clienteRepository.save(cliente);
            return cliente; // retornar com o id
        } catch (error) {
            throw new InternalServerErrorException(`Erro ao gravar Cliente/Usuario. ${error}`);
        }
    }

    async update(id:number, clienteDTO:ClienteRequestDTO):Promise<Cliente>{
        if (!clienteDTO)
            throw new BadRequestException('Dados nulos.');
                
        let cliente = await this.clienteRepository.findOne({
            where: [{"cpfcnpj":clienteDTO.cpfcnpj}]
        });
        
        if (cliente) {
            if (cliente.id != id)
                throw new BadRequestException('CpfCnpj incluso em outro cadastro de Cliente/Usuario.');
            else if (cliente.email != clienteDTO.email) {
                cliente = await this.clienteRepository.findOne({
                    where: [{"email":clienteDTO.email}]
                });
                if (cliente)
                    throw new BadRequestException('E-Mail incluso em outro cadastro de Cliente/Usuario.');
                else 
                    cliente = await this.clienteRepository.findOne(id);
            }
        } else 
            cliente = await this.clienteRepository.findOne(id);

        if (!cliente || !cliente.isActive)
            throw new NotFoundException('Cliente/Usuario não encontrado.');

        try {
            cliente.nome = clienteDTO.nome;
            cliente.cpfcnpj = clienteDTO.cpfcnpj;
            cliente.email = clienteDTO.email;
            cliente.senha = clienteDTO.senha;
        
            return await this.clienteRepository.save(cliente);
        } catch (error) {
            throw new InternalServerErrorException(`Erro ao atualizar Cliente/Usuario. ${error}`);
        }
    }

    async destroy(id: number): Promise<void> {
        const cliente = await this.findOne(id);
        try {
            cliente.isActive = false;
            await this.clienteRepository.save(cliente);
        } catch (error) {
            throw new InternalServerErrorException(`Erro ao deletar Cliente/Usuario. ${error}`);
        }
    }
}
