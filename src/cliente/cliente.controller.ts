import { Controller, Get, Param, Query, Post, Body, Put, Delete } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Cliente } from './cliente.entity';
import { ClienteRequestDTO } from './cliente.request.dto';

@ApiTags('Cliente')
@Controller('cliente')
export class ClienteController {
    constructor(
        private readonly clienteService: ClienteService
    ) {}

    @Get()
    @ApiResponse({
        status:200,
        description: 'Listar Clientes/Usuário',
        type: Cliente,
        isArray:true
    })
    findAll():Promise<Cliente[]>{
        return this.clienteService.findAll();
    }

    @Get(':id')
    @ApiResponse({
        status:200,
        description: 'Buscas Cliente/Usuário por ID',
        type: Cliente,
        isArray:false
    })
    findOne(@Param('id') id: number):Promise<Cliente>{
        return this.clienteService.findOne(id);
    }

    @Post()
    @ApiResponse({
        status:200,
        description: 'Cadastrar novo Cliente/Usuário',
        type: Cliente,
        isArray:false
    })
    create(@Body() clienteDTO:ClienteRequestDTO) {
        return this.clienteService.create(clienteDTO);
    }

    @Put(':id')
    @ApiResponse({
        status:200,
        description: 'Alterar cadastro Cliente/Usuário',
        type: Cliente,
        isArray:false
    })
    update(@Param('id') id: number, @Body() clienteDTO:ClienteRequestDTO):Promise<Cliente> {
        return this.clienteService.update(id,clienteDTO);
    }

    @Delete(':id')
    @ApiResponse({
        status:200,
        description: 'Deletar cadastro Cliente/Usuário',
        type: Cliente,
        isArray:false
    })
    delete(@Param('id') id: number):Promise<Cliente> {
        return this.clienteService.delete(id);
    }
}