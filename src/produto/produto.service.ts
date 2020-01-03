import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './produto.entity';
import { ProdutoResponseDto } from './produto.response.dto'
import { ProdutoRequestDto, ProdutoQueryDto } from './produto.request.dto';
import { CategoriaService } from 'src/categoria/categoria.service';

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private readonly produtoRepository: Repository<Produto>,
        private readonly categoriaService: CategoriaService
    ) { }

    async findAll(query: ProdutoQueryDto): Promise<ProdutoResponseDto[]> {
        const produtos = await this.produtoRepository.find({
            where: [{ "isActive": true, ...query }]
        });
        
        if (!produtos || produtos.length == 0) {
            throw new NotFoundException("Produtos não encontrados!");
        }

        let response: Array<ProdutoResponseDto> = [];

        for (var x in produtos) {
            const categoria = await this.categoriaService.getById(produtos[x].idCategoria);

            const produto = new ProdutoResponseDto;

            produto.id = produtos[x].id;
            produto.descricao = produtos[x].descricao;
            produto.quantidade = produtos[x].quantidade;
            produto.valor = produtos[x].valor;
            produto.categoria = categoria;
            produto.isActive = produtos[x].isActive;

            response.push(produto);
        }      
        
        return response;
    }

    async getById(id: number): Promise<ProdutoResponseDto> {
        let produto = null;
        
        try {
            produto = await this.produtoRepository.findOne({
                where: [{ "id": id }]
            });
        } catch (error) {
            throw new InternalServerErrorException('Erro ao buscar dados do Produto');
        }
        
        if (!produto || !produto.isActive) {
            throw new NotFoundException("Produto não encontrado!");
        }

        const categoria = await this.categoriaService.getById(produto.idCategoria);

        const response = new ProdutoResponseDto();

        response.id = produto.id;
        response.descricao = produto.descricao;
        response.quantidade = produto.quantidade;
        response.valor = produto.valor;
        response.categoria = categoria;
        response.isActive = produto.isActive;

        return response;
    }

    async create(request: ProdutoRequestDto) : Promise<ProdutoResponseDto>{
        if (!request) {
            throw new BadRequestException('Dados nulos.');
        }

        if (request.quantidade < 0) {
            throw new BadRequestException(`Quantidade não pode ser negativa. Quantidade: ${request.quantidade}`);
        }

        if (request.valor <= 0) {
            throw new BadRequestException(`Valor do produto precisa ser maior que zero. Valor: ${request.valor}`);
        }
       
        // Validar se a categoria existe
        await this.categoriaService.getById(request.idCategoria);

        const produto = new Produto();

        produto.descricao = request.descricao;
        produto.idCategoria = request.idCategoria;
        produto.quantidade = request.quantidade;
        produto.valor = request.valor;
        
        try {
            await this.produtoRepository.save(produto);
            return await this.getById(produto.id);
        } catch (error) {
            throw new InternalServerErrorException(`Erro ao gravar produto. ${error}`);
        }
    }

    async update(id: number, request: ProdutoRequestDto) : Promise<ProdutoResponseDto> {
        if (!request) {
            throw new BadRequestException('Dados nulos.');
        }

        if (request.quantidade < 0) {
            throw new BadRequestException(`Quantidade não pode ser negativa. Quantidade: ${request.quantidade}`);
        }

        if (request.valor <= 0) {
            throw new BadRequestException(`Valor do produto precisa ser maior que zero. Valor: ${request.valor}`);
        }

        // Validar se a categoria existe
        await this.categoriaService.getById(request.idCategoria);

        const produto = await this.produtoRepository.findOne(id);

        if (!produto) {
            throw new NotFoundException(`Produto não encontrado para o Id ${id}.`);
        }

        produto.descricao = request.descricao;
        produto.idCategoria = request.idCategoria;
        produto.quantidade = request.quantidade
        produto.valor = request.valor;
        
        try {
            await this.produtoRepository.save(produto);
            return await this.getById(produto.id);
        } catch (error) {
            throw new InternalServerErrorException(`Erro ao atualizar produto. ${error}`);
        }
    }

    async destroy(id: number): Promise<void> {

        if (!id) {
            throw new BadRequestException('Id nulo para Produto.');
        }

        let produtoResponse = await this.getById(id);

        let produto = new Produto();
        produto.descricao = produtoResponse.descricao;
        produto.quantidade = produtoResponse.quantidade;
        produto.valor = produtoResponse.valor;
        produto.id = produtoResponse.id;
        produto.isActive = false;
                
        try {
            await this.produtoRepository.save(produto);
        } catch (error) {
            throw new InternalServerErrorException('Erro ao inativar produto');
        }
    }

}

