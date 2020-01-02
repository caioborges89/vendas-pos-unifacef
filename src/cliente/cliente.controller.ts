import { Controller, Get, Param, Query, Post, Body, Put, Delete, HttpCode, HttpStatus, UseInterceptors } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ApiTags, ApiOkResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse, ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Cliente } from './cliente.entity';
import { ClienteRequestDTO } from './cliente.request.dto';
import { AuthenticationInterceptor } from 'src/auth/authentication.interceptor';

@ApiTags('Cliente')
@Controller('cliente')
export class ClienteController {
    constructor(
        private readonly clienteService: ClienteService
    ) {}

    @ApiBearerAuth()
    @UseInterceptors(AuthenticationInterceptor)
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Lista de Clientes/Usuários',
        type: Cliente,
        isArray: true,

    })
    @ApiNotFoundResponse({
        description: 'Não encontrado'
    })
    @ApiInternalServerErrorResponse({
        description: 'Erro inesperado'
    })
    findAll(): Promise<Cliente[]>{
        return this.clienteService.findAll();
    }

    @ApiBearerAuth()
    @UseInterceptors(AuthenticationInterceptor)
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Detalhes do Cliente/Usuário por ID',
        type: Cliente,
        isArray: false
    })
    @ApiNotFoundResponse({
        description: 'Não encontrado'
    })
    @ApiBadRequestResponse({
        description: 'Requisição inválida'
    })
    @ApiInternalServerErrorResponse({
        description: 'Erro inesperado'
    })
    findOne(@Param('id') id: number):Promise<Cliente>{
        return this.clienteService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
        description: 'Cliente/Usuário cadastrado',
        type: Cliente,
        isArray: false
    })
    @ApiNotFoundResponse({
        description: 'Não encontrado'
    })
    @ApiBadRequestResponse({
        description: 'Requisição inválida'
    })
    @ApiInternalServerErrorResponse({
        description: 'Erro inesperado'
    })
    create(@Body() clienteDTO:ClienteRequestDTO) {
        return this.clienteService.create(clienteDTO);
    }

    @ApiBearerAuth()
    @UseInterceptors(AuthenticationInterceptor)
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Cliente/Usuário atualizado',
        type: Cliente,
        isArray: false
    })
    @ApiNotFoundResponse({
        description: 'Não encontrado'
    })
    @ApiBadRequestResponse({
        description: 'Requisição inválida'
    })
    @ApiInternalServerErrorResponse({
        description: 'Erro inesperado'
    })
    update(@Param('id') id: number, @Body() clienteDTO:ClienteRequestDTO):Promise<Cliente> {
        return this.clienteService.update(id,clienteDTO);
    }

    @ApiBearerAuth()
    @UseInterceptors(AuthenticationInterceptor)
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNoContentResponse({
        description: 'Cliente/Usuário deletado',
        isArray: false
    })
    @ApiNotFoundResponse({
        description: 'Não encontrado'
    })
    @ApiBadRequestResponse({
        description: 'Requisição inválida'
    })
    @ApiInternalServerErrorResponse({
        description: 'Erro inesperado'
    })
    delete(@Param('id') id: number):Promise<Cliente> {
        return this.clienteService.delete(id);
    }
}