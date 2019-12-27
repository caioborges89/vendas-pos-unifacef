import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';
import { CategoriaResponseDto } from './categoria.response.dto';
import { CategoriaRequestDto } from './categoria.request.dto';

@Injectable()
export class CategoriaService {
    constructor(
        @InjectRepository(Categoria)
        private readonly categoriaRepository: Repository<Categoria>,
    ) { }

    async findAll(): Promise<CategoriaResponseDto[]> {
        const categoriaResponse = await this.categoriaRepository.find({
            where: [{ "isActive": true }]
        });

        let response: Array<CategoriaResponseDto> = [];

        categoriaResponse.forEach(x => {
            let categoriaResponseDto: CategoriaResponseDto;
            categoriaResponseDto = new CategoriaResponseDto;
            categoriaResponseDto.description = x.descricao;
            categoriaResponseDto.id = x.id;
            response.push(categoriaResponseDto);
        });

        return response;
    }

    async getCategoria(id: number): Promise<CategoriaResponseDto> {
        let categoria = null;
        try {
            categoria = await this.categoriaRepository.findOne({
                where: [{ "id": id }]
            });
        } catch (error) {
            throw new InternalServerErrorException('Erro ao buscar dados da Categoria');
        }

        return categoria;
    }

    async create(categoriaDto: CategoriaRequestDto) {

        if (!categoriaDto) {
            throw new BadRequestException('Dados nulos para cadastrar nova Categoria.');
        }

        let categoriaResponse = await this.getCategoria(categoriaDto.id);

        if (categoriaResponse) {
            throw new BadRequestException(`Já existe informações para o Id informado. Id: ${categoriaDto.id}.`);
        }

        let categoria = new Categoria();
        categoria.descricao = categoriaDto.description;
        categoria.id = categoriaDto.id;

        try {
            this.categoriaRepository.save(categoria);
        } catch (error) {
            throw new InternalServerErrorException(`Erro ao gravar categoria. ${error}`);
        }
    }

    async updateCategoria(categoriaDto: CategoriaRequestDto) {

        if (!categoriaDto) {
            throw new BadRequestException('Dados nulos para cadastrar nova Categoria.');
        }

        let categoriaResponse = await this.getCategoria(categoriaDto.id);

        if (!categoriaResponse) {
            throw new BadRequestException(`Informçãoes não encontradas na Categoria para o Id ${categoriaDto.id}.`);
        }

        let categoria = new Categoria();
        categoria.descricao = categoriaDto.description;
        categoria.id = categoriaDto.id;

        try {
            this.categoriaRepository.save(categoria);
        } catch (error) {
            throw new InternalServerErrorException(`Erro ao atualizar categoria. ${error}`);
        }

        this.categoriaRepository.save(categoria);
    }

    async deleteCategoria(id: number) {

        if (!id) {
            throw new BadRequestException('Id nulo para Categoria.');
        }

        let categoriaResponse = await this.getCategoria(id);

        if (!categoriaResponse) {
            throw new BadRequestException(`Informçãoes não encontradas na Categoria para o Id ${id}.`);
        }

        let categoria = new Categoria();
        categoria.descricao = categoriaResponse.description;
        categoria.id = categoriaResponse.id;
        categoria.isActive = false;
        try {
            this.categoriaRepository.save(categoria);
        } catch (error) {
            throw new InternalServerErrorException('Erro ao inativar Categoria');
        }

    }
}
