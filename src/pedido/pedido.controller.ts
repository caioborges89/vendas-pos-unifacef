import { Controller, Get, Query, Post, Body, Param, Put, Delete, HttpStatus, HttpCode, UseInterceptors } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoRequestDto, PedidoResponseDto, PedidoQueryDto } from './pedido.dto';
import { ApiTags, ApiOkResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { AuthenticationInterceptor } from 'src/auth/authentication.interceptor';

@ApiTags('Pedido')
@Controller('pedido')
@UseInterceptors(AuthenticationInterceptor)
export class PedidoController {
    constructor(private readonly service: PedidoService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Lista de pedidos',
        type: PedidoResponseDto,
        isArray: true
    })
    @ApiNotFoundResponse({
        description: 'Não encontrado'
    })
    @ApiInternalServerErrorResponse({
        description: 'Erro inesperado'
    })
    get(@Query() query: PedidoQueryDto): Promise<PedidoResponseDto[]> {
        return this.service.get(query);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Detalhes do pedido',
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
        description: 'Pedido adicionado',
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
        description: 'Pedido atualizado',
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
        description: 'Pedido excluído',
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
