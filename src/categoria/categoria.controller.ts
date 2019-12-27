import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { Categoria } from './categoria.entity';
import { CategoriaResponseDto } from './categoria.response.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { CategoriaRequestDto } from './categoria.request.dto';


@Controller('categoria')
export class CategoriaController {
    constructor(private readonly categoriaService: CategoriaService) { }

    @Get('/findAll')
    @ApiResponse({
        status: 200,
        description: 'Lista de Categorias',
        type: CategoriaResponseDto,
        isArray: true
    })
    findAll(): Promise<CategoriaResponseDto[]> {
        return this.categoriaService.findAll();
    }

    @Post('/create')
    @ApiResponse({
        status: 200,
        description: 'Categoria criada',
        type: CategoriaResponseDto,
        isArray: true
    })
    createCategoria(@Body() categoriaRequestDto: CategoriaRequestDto) {
        this.categoriaService.create(categoriaRequestDto);
    }

    updateCategoria(@Body() categoriaRequestDto: CategoriaRequestDto) {
        this.categoriaService.updateCategoria(categoriaRequestDto);
    }

}
