import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './produto.entity';
import { ProdutoResponseDto } from './produto.response.dto'
import { ProdutoRequestDto } from './produto.request.dto';
import { Categoria } from 'src/categoria/categoria.entity';
import { CategoriaService } from 'src/categoria/categoria.service';
import { CategoriaResponseDto } from 'src/categoria/categoria.response.dto';


@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private readonly produtoRepository: Repository<Produto>,
        private readonly categoriaService: CategoriaService
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
            let categoria = new Categoria();
            //produtoResponseDto.category = categoria;
            produtoResponseDto.id = x.id;
            response.push(produtoResponseDto);
        });

        return response;
    }

    async getProduto(id: number): Promise<ProdutoResponseDto> {
        let produto = null;
        let produtoDto = new  ProdutoResponseDto();
        
        try {
            produto = await this.produtoRepository.findOne({
                where: [{ "id": id }]
            });
        } catch (error) {
            throw new InternalServerErrorException('Erro ao buscar dados do Produto');
        }
        
        let categoriaDTO = new CategoriaResponseDto();
        categoriaDTO =  await this.categoriaService.getCategoria(produto.idCategoria);
        produtoDto.description = produto.descricao;
        produtoDto.quantity = produto.quantidade;
        produtoDto.cost = produto.valor;
        produtoDto.category = categoriaDTO;
        produtoDto.id = produto.id;
    
        return produtoDto;
    }

    async create(produtoDto: ProdutoRequestDto) {

        if (!produtoDto) {
            throw new BadRequestException('Dados nulos para cadastrar novo Produto.');
        }

        let produtoResponse = await this.getProduto(produtoDto.id);

        if (produtoResponse) {
            throw new BadRequestException(`Já existe informações para o Id informado. Id: ${produtoDto.id}.`);
        }

        let produto = new Produto();
        produto.descricao = produtoDto.description;
        produto.idCategoria = produtoDto.category;
        produto.quantidade = produtoDto.quantity
        produto.valor = produtoDto.cost;
        produto.id = produtoDto.id;
        
        if (produtoDto.quantity < 0){
            throw new BadRequestException(`Quantidade não pode ser negativa. Quantidade: ${produtoDto.quantity}`);
        }

        if (produtoDto.cost <= 0){
            throw new BadRequestException(`Valor do produto precisa ser maior que zero. Valor: ${produtoDto.cost}`);
        }

        try {
            this.produtoRepository.save(produto);
        } catch (error) {
            throw new InternalServerErrorException(`Erro ao gravar produto. ${error}`);
        }
    }

    async updateProduto(produtoDto: ProdutoRequestDto) {

        if (!produtoDto) {
            throw new BadRequestException('Dados nulos para atualizar produto.');
        }

        let produtoResponse = await this.getProduto(produtoDto.id);

        if (!produtoResponse) {
            throw new BadRequestException(`Produto não encontrado para o Id ${produtoDto.id}.`);
        }

        let produto = new Produto();
        produto.descricao = produtoDto.description;
        produto.idCategoria = produtoDto.category;
        produto.quantidade = produtoDto.quantity
        produto.valor = produtoDto.cost;
        produto.id = produtoDto.id;
        
        if (produto.quantidade < 0){
            throw new BadRequestException(`Quantidade não pode ser negativa. Quantidade: ${produtoDto.quantity}`);
        }

        if (produto.valor <= 0){
            throw new BadRequestException(`Valor do produto precisa ser maior que zero. Valor: ${produtoDto.cost}`);
        }
        try {
            this.produtoRepository.save(produto);
        } catch (error) {
            throw new InternalServerErrorException(`Erro ao atualizar produto. ${error}`);
        }

        this.produtoRepository.save(produto);
    }

    async deleteProduto(id: number) {

        if (!id) {
            throw new BadRequestException('Id nulo para Produto.');
        }

        let produtoResponse = await this.getProduto(id);

        if (!produtoResponse) {
            throw new BadRequestException(`Informções não encontradas para o Produt: Id ${id}.`);
        }

        let produto = new Produto();
        produto.descricao = produtoResponse.description;
        produto.quantidade = produtoResponse.quantity;
        produto.valor = produtoResponse.cost;
        produto.id = produtoResponse.id;
        produto.isActive = false;
                
        try {
            this.produtoRepository.save(produto);
        } catch (error) {
            throw new InternalServerErrorException('Erro ao inativar produto');
        }

    }

}

