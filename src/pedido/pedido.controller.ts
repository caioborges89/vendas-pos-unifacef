import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoRequestDto, PedidoResponseDto } from './pedido.dto';
import { ApiOkResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';

@Controller('pedido')
export class PedidoController {
    constructor(private readonly service: PedidoService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Listar pedidos',
        type: PedidoResponseDto,
        isArray: true
    })
    @ApiNotFoundResponse({
        description: 'Não encontrado'
    })
    @ApiInternalServerErrorResponse({
        description: 'Erro inesperado'
    })
    get(): Promise<PedidoResponseDto[]> {
        return this.service.get();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Buscar pedido por ID',
        type: PedidoResponseDto,
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
    details(@Param('id') id: number): Promise<PedidoResponseDto> {
        return this.service.details(id);        
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
        description: 'Adicionar pedido',
        type: PedidoResponseDto,
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
    create(@Body() request: PedidoRequestDto): Promise<PedidoResponseDto> {
        return this.service.create(request);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Atualizar pedido',
        type: PedidoResponseDto,
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
    update(@Param('id') id: number, @Body() request: PedidoRequestDto): Promise<PedidoResponseDto> {
        return this.service.update(id, request);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNoContentResponse({
        description: 'Deletar pedido',
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
    destroy(@Param('id') id: number): Promise<void> {
        return this.service.destroy(id);
    }
}
