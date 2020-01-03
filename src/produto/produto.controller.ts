import { Controller, Get, Query, Post, Body, Param, Put, Delete, HttpStatus, HttpCode, UseInterceptors } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoResponseDto } from './produto.response.dto';
import { ProdutoRequestDto, ProdutoQueryDto } from './produto.request.dto';
import { ApiNoContentResponse, ApiOkResponse, ApiTags, ApiNotFoundResponse, ApiInternalServerErrorResponse, ApiBadRequestResponse, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthenticationInterceptor } from 'src/auth/authentication.interceptor';

@ApiTags('Produto')
@Controller('produto')
export class ProdutoController {
        constructor(private readonly service: ProdutoService) { }
    
        @Get()
        @HttpCode(HttpStatus.OK)
        @ApiOkResponse({
            description: 'Lista de produtos',
            type: ProdutoResponseDto,
            isArray: true
        })
        @ApiNotFoundResponse({
            description: 'Não encontrado'
        })
        @ApiInternalServerErrorResponse({
            description: 'Erro inesperado'
        })
        findAll(@Query() query: ProdutoQueryDto): Promise<ProdutoResponseDto[]> {
            return this.service.findAll(query);
        }
    
        @Get(':id')
        @HttpCode(HttpStatus.OK)
        @ApiOkResponse({
            description: 'Detalhes do produto por ID',
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
            return this.service.getById(id);        
        }

        @ApiBearerAuth()
        @UseInterceptors(AuthenticationInterceptor)
        @Post()
        @HttpCode(HttpStatus.CREATED)
        @ApiCreatedResponse({
            description: 'Produto adicionado',
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
        create(@Body() request: ProdutoRequestDto): Promise<ProdutoResponseDto>  {
            return this.service.create(request);
        }

        @ApiBearerAuth()
        @UseInterceptors(AuthenticationInterceptor)
        @Put(':id')
        @HttpCode(HttpStatus.OK)
        @ApiOkResponse({
            description: 'Produto atualizado',
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
        update(@Param('id') id: number, @Body() request: ProdutoRequestDto): Promise<ProdutoResponseDto>  {
            return this.service.update(id, request);
        }

        @ApiBearerAuth()
        @UseInterceptors(AuthenticationInterceptor)
        @Delete(':id')
        @HttpCode(HttpStatus.NO_CONTENT)
        @ApiNoContentResponse({
            description: 'Produto excluído',
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
