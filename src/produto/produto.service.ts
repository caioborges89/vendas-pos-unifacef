import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './produto.entity';
import { ProdutoResponseDto } from './produto.response.dto'


@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private readonly produtoRepository: Repository<Produto>,
    ) { }

    async findAll(): Promise<ProdutoResponseDto[]> {
        const produtoResponse = await this.produtoRepository.find({
            where: [{ "isActive": true }]
        });

        let response: Array<ProdutoResponseDto> = [];

        produtoResponse.forEach(x => {
            let produtoResponseDto: ProdutoResponseDto;
            produtoResponseDto = new ProdutoResponseDto;
            produtoResponseDto.description = x.descricao;
            produtoResponseDto.quantity = x.quantidade;
            produtoResponseDto.cost = x.valor;
            produtoResponseDto.category = x.idCategoria;
            produtoResponseDto.id = x.id;
            response.push(produtoResponseDto);
        });

        return response;
    }

    async getProduto(id: number): Promise<ProdutoResponseDto> {
        let produto = null;
        try {
            produto = await this.produtoRepository.findOne({
                where: [{ "id": id }]
            });
        } catch (error) {
            throw new InternalServerErrorException('Erro ao buscar dados do produto');
        }
        
        var produtoResponseDto = new ProdutoResponseDto;
        produtoResponseDto.description = produto.descricao;
        produtoResponseDto.quantity = produto.quantidade;
        produtoResponseDto.cost = produto.valor;
        produtoResponseDto.category = produto.idCategoria;
        produtoResponseDto.id = produto.id;
        return produtoResponseDto;
    }

}

