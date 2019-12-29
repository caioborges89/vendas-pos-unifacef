import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { Produto } from './produto.entity';
import { ProdutoResponseDto } from './produto.response.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('produto')
export class ProdutoController {
        constructor(private readonly produtoService: ProdutoService) { }
    
        @Get()
        @ApiResponse({
            status: 200,
            description: 'Lista de Produtos',
            type: ProdutoResponseDto,
            isArray: true
        })
        findAll(): Promise<ProdutoResponseDto[]> {
            return this.produtoService.findAll();
        }
    
        @Get(':id')
        @ApiResponse({
            status: 200,
            description: 'Busca produto por Id',
            type: ProdutoResponseDto,
            isArray: false
        })
        getById(@Param('id') id: number): Promise<ProdutoResponseDto> {
            return this.produtoService.getProduto(id);        
        }
}
