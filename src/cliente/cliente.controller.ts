import { Controller, Get, Param, Query, Post, Body, Put, Delete, HttpCode, HttpStatus, UseInterceptors } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ApiResponse, ApiTags, ApiOkResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse, ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse, ApiHeader } from '@nestjs/swagger';
import { Cliente } from './cliente.entity';
import { ClienteRequestDTO } from './cliente.request.dto';
import { AuthenticationInterceptor } from 'src/auth/authentication.interceptor';

@ApiTags('Cliente')
@Controller('cliente')

export class ClienteController {
    constructor(
        private readonly clienteService: ClienteService
    ) {}

    @UseInterceptors(AuthenticationInterceptor)
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Listar Clientes/Usuário',
        type: Cliente,
        isArray:true,

    })
    @ApiHeader({
        name: 'Authorization',
        description: 'Auth token',
      })
    @ApiNotFoundResponse({
        description: 'Não encontrado'
    })
    @ApiInternalServerErrorResponse({
        description: 'Erro inesperado'
    })
    findAll():Promise<Cliente[]>{
        return this.clienteService.findAll();
    }

    @UseInterceptors(AuthenticationInterceptor)
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Buscas Cliente/Usuário por ID',
        type: Cliente,
        isArray:false
    })
    @ApiHeader({
        name: 'Authorization',
        description: 'Auth token',
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
        description: 'Cadastrar novo Cliente/Usuário',
        type: Cliente,
        isArray:false
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

    @UseInterceptors(AuthenticationInterceptor)
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Alterar cadastro Cliente/Usuário',
        type: Cliente,
        isArray:false
    })
    @ApiHeader({
        name: 'Authorization',
        description: 'Auth token',
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

    @UseInterceptors(AuthenticationInterceptor)
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNoContentResponse({
        description: 'Deletar cadastro Cliente/Usuário',
        isArray:false
    })
    @ApiHeader({
        name: 'Authorization',
        description: 'Auth token',
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