import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus, HttpCode, UseInterceptors } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoResponseDto } from './produto.response.dto';
import { ProdutoRequestDto } from './produto.request.dto';
import { ApiNoContentResponse, ApiOkResponse, ApiResponse, ApiTags, ApiNotFoundResponse, ApiInternalServerErrorResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';
import { AuthenticationInterceptor } from 'src/auth/authentication.interceptor';
import { Produto } from './produto.entity';

@ApiTags('Produto')
@Controller('produto')
@UseInterceptors(AuthenticationInterceptor)
export class ProdutoController {
        constructor(private readonly produtoService: ProdutoService) { }
    
        @Get()
        @ApiResponse({
            status: 200,
            description: 'Lista de Produtos',
            type: ProdutoResponseDto,
            isArray: true
        })
        @ApiNotFoundResponse({
            description: 'Produtos não encontrados'
        })
        @ApiInternalServerErrorResponse({
            description: 'Erro inesperado'
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
        @ApiNotFoundResponse({
            description: 'Não encontrado'
        })
        @ApiBadRequestResponse({
            description: 'Requisição inválida'
        })
        @ApiInternalServerErrorResponse({
            description: 'Erro inesperado'
        })
        getById(@Param('id') id: number): Promise<ProdutoResponseDto> {
            return this.produtoService.getProduto(id);        
        }
        @Post()
        @ApiResponse({
            status: 201,
            description: 'Produto criado',
            type: Produto,
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
        createCategoria(@Body() produtoRequestDto: ProdutoRequestDto) {
            if (produtoRequestDto.quantity < 0){
                throw new BadRequestException(`Quantidade não pode ser negativa. Quantidade: ${produtoRequestDto.quantity}`);
            }
    
            if (produtoRequestDto.cost <= 0){
                throw new BadRequestException(`Valor do produto precisa ser maior que zero. Valor: ${produtoRequestDto.cost}`);
            }
            return this.produtoService.create(produtoRequestDto);
        }

        @Put(':id')
        @HttpCode(HttpStatus.OK)
        @ApiOkResponse({
            description: 'Atualizar pedido',
            type: ProdutoResponseDto,
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
        updateCategoria(@Body() produtoequestDto: ProdutoRequestDto, @Param('id') id: number) {
            if (produtoequestDto.quantity < 0){
                throw new BadRequestException(`Quantidade não pode ser negativa. Quantidade: ${produtoequestDto.quantity}`);
            }
    
            if (produtoequestDto.cost <= 0){
                throw new BadRequestException(`Valor do produto precisa ser maior que zero. Valor: ${produtoequestDto.cost}`);
            }
            return this.produtoService.updateProduto(produtoequestDto, id);
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
        deleteCategoria(@Param('id') id: number) {
            this.produtoService.deleteProduto(id);
        }
}
