import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus, HttpCode, Res, HttpException, UseInterceptors } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaResponseDto } from './categoria.response.dto';
import { ApiTags, ApiNoContentResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiCreatedResponse, ApiOkResponse, ApiHeader } from '@nestjs/swagger';
import { CategoriaRequestDto } from './categoria.request.dto';
import { AuthenticationInterceptor } from 'src/auth/authentication.interceptor';

@ApiTags('Categoria')
@Controller('categoria')
@UseInterceptors(AuthenticationInterceptor)
export class CategoriaController {
    constructor(private readonly categoriaService: CategoriaService) { }

    @Get()
    @ApiHeader({
        name: 'Authorization',
        description: 'Auth token',
      })
    @ApiCreatedResponse({
        status: 200,
        description: 'Lista de Categorias',
        type: CategoriaResponseDto,
        isArray: true
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
    findAll(): Promise<CategoriaResponseDto[]> {
        return this.categoriaService.findAll();        
    }

    @Get(':id')
    @ApiHeader({
        name: 'Authorization',
        description: 'Auth token',
      })
    @ApiCreatedResponse({
        description: 'Busca categoria por Id',
        type: CategoriaResponseDto,
        isArray: true
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
        return this.categoriaService.getCategoria(id);        
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiHeader({
        name: 'Authorization',
        description: 'Auth token',
      })
    @ApiCreatedResponse({
        description: 'Adicionar categoria',
        type: CategoriaResponseDto,
        isArray: true
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
    createCategoria(@Body() categoriaRequestDto: CategoriaRequestDto) {
        this.categoriaService.create(categoriaRequestDto);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Atualizar pedido',        
        isArray: false
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
    updateCategoria(@Body() categoriaRequestDto: CategoriaRequestDto) {
        this.categoriaService.updateCategoria(categoriaRequestDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNoContentResponse({
        description: 'Deletar categoria',
        isArray: false
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
    deleteCategoria(@Param('id') id: number) {        
         this.categoriaService.deleteCategoria(id);
    }

}
