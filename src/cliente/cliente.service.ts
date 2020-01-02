import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
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
        return await this.clienteRepository.find({
            where: [{"isActive":true}]
        })
    }

    async findOne(id: number): Promise<Cliente>{
        return await this.clienteRepository.findOne(id);
    }

    async create(clienteDTO:ClienteRequestDTO): Promise<Cliente>{
        if (!clienteDTO)
            throw new BadRequestException('Dados nulos para cadastrar novo Cliente/Usuario.');
        
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
            throw new BadRequestException('Dados nulos para cadastrar novo Cliente/Usuario.');
                
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

        if (!cliente)
            throw new BadRequestException('Cadastrado Cliente/Usuario não localizado.');

        try {
            cliente.nome = clienteDTO.nome;
            cliente.cpfcnpj = clienteDTO.cpfcnpj;
            cliente.email = clienteDTO.email;
            cliente.senha = clienteDTO.senha;
        
            return await this.clienteRepository.save(cliente);
        } catch (error) {
            throw new InternalServerErrorException(`Erro ao gravar Cliente/Usuario. ${error}`);
        }
    }

    async delete(id:number):Promise<Cliente>{
        let cliente = await this.clienteRepository.findOne(id);

        if (!cliente)
            throw new BadRequestException('Cadastrado Cliente/Usuario não localizado.');

        try {
            cliente.isActive = false;
            
            return await this.clienteRepository.save(cliente);
        } catch (error) {
            throw new InternalServerErrorException(`Erro ao gravar Cliente/Usuario. ${error}`);
        }
    }
}
