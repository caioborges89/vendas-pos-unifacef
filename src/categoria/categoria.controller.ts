import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus, HttpCode, Res, HttpException, UseInterceptors } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaResponseDto } from './categoria.response.dto';
import { ApiTags, ApiNoContentResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiCreatedResponse, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CategoriaRequestDto } from './categoria.request.dto';
import { AuthenticationInterceptor } from 'src/auth/authentication.interceptor';

@ApiTags('Categoria')
@Controller('categoria')
@UseInterceptors(AuthenticationInterceptor)
@ApiBearerAuth()
export class CategoriaController {
    constructor(private readonly service: CategoriaService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Lista de categorias',
        type: CategoriaResponseDto,
        isArray: true
    })
    @ApiNotFoundResponse({
        description: 'Não encontrado'
    })
    @ApiInternalServerErrorResponse({
        description: 'Erro inesperado'
    })
    findAll(): Promise<CategoriaResponseDto[]> {
        return this.service.findAll();        
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Detalhes da categoria por ID',
        type: CategoriaResponseDto,
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
    getById(@Param('id') id: number): Promise<CategoriaResponseDto> {
        return this.service.getById(id);        
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
        description: 'Categoria adicionada',
        type: CategoriaResponseDto,
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
    create(@Body() request: CategoriaRequestDto): Promise<CategoriaResponseDto> {
        return this.service.create(request);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Categoria atualizada',  
        type: CategoriaResponseDto,      
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
    update(@Param('id') id: number, @Body() request: CategoriaRequestDto): Promise<CategoriaResponseDto> {
        return this.service.update(id, request);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNoContentResponse({
        description: 'Categoria excluída',
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
