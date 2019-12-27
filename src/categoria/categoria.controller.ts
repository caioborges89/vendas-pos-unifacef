import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { Categoria } from './categoria.entity';
import { CategoriaResponseDto } from './categoria.response.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { CategoriaRequestDto } from './categoria.request.dto';


@Controller('categoria')
export class CategoriaController {
    constructor(private readonly categoriaService: CategoriaService) { }

    @Get()
    @ApiResponse({
        status: 200,
        description: 'Lista de Categorias',
        type: CategoriaResponseDto,
        isArray: true
    })
    findAll(): Promise<CategoriaResponseDto[]> {
        return this.categoriaService.findAll();
    }

    @Get(':id')
    @ApiResponse({
        status: 200,
        description: 'Busca Categoria por Id',
        type: CategoriaResponseDto,
        isArray: false
    })
    getById(@Param('id') id: number): Promise<CategoriaResponseDto> {
        return this.categoriaService.getCategoria(id);        
    }

    @Post()
    @ApiResponse({
        status: 200,
        description: 'Categoria criada',
        type: CategoriaResponseDto,
        isArray: true
    })
    createCategoria(@Body() categoriaRequestDto: CategoriaRequestDto) {
        this.categoriaService.create(categoriaRequestDto);
    }

    @Put()
    updateCategoria(@Body() categoriaRequestDto: CategoriaRequestDto) {
        this.categoriaService.updateCategoria(categoriaRequestDto);
    }

    @Delete(':id')
    deleteCategoria(@Param('id') id: number) {
        this.categoriaService.deleteCategoria(id);
    }

}
