import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException, HttpException, HttpModule } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';
import { CategoriaResponseDto } from './categoria.response.dto';
import { CategoriaRequestDto } from './categoria.request.dto';

@Injectable()
export class CategoriaService {
    constructor(
        @InjectRepository(Categoria)
        private readonly repository: Repository<Categoria>,
    ) { }

    async findAll(): Promise<CategoriaResponseDto[]> {
        const categoriaResponse = await this.repository.find({
            where: [{ "isActive": true }]
        });

        let response: Array<CategoriaResponseDto> = [];

        categoriaResponse.forEach(x => {
            let categoriaResponseDto: CategoriaResponseDto;
            categoriaResponseDto = new CategoriaResponseDto;
            categoriaResponseDto.descricao = x.descricao;
            categoriaResponseDto.id = x.id;
            response.push(categoriaResponseDto);
        });

        return response;
    }

    async getById(id: number): Promise<CategoriaResponseDto> {
        let categoria = null;
        try {
            categoria = await this.repository.findOne({
                where: [{ "id": id }]
            });
        } catch (error) {
            throw new InternalServerErrorException('Erro ao buscar dados da Categoria');
        }

        if (!categoria) {
            throw new NotFoundException(`Categoria ${id} não encontrada.`);
        }

        return categoria;
    }

    async create(request: CategoriaRequestDto): Promise<CategoriaResponseDto> {
        if (!request) {
            throw new BadRequestException('Dados nulos para cadastrar nova Categoria.');
        }

        let categoria = new Categoria();
        categoria.descricao = request.descricao;

        try {
            await this.repository.save(categoria);
            return await this.getById(categoria.id);
        } catch (error) {
            throw new InternalServerErrorException(`Erro ao gravar categoria. ${error}`);
        }
    }

    async update(id: number, request: CategoriaRequestDto): Promise<CategoriaResponseDto> {
        if (!request) {
            throw new BadRequestException('Dados nulos para cadastrar nova Categoria.');
        }

        const categoria = await this.getById(id);
        categoria.descricao = request.descricao;

        try {
            await this.repository.save(categoria);
            return await this.getById(categoria.id);
        } catch (error) {
            throw new InternalServerErrorException(`Erro ao atualizar categoria. ${error}`);
        }
    }

    async destroy(id: number): Promise<void> {

        if (!id) {
            throw new BadRequestException('Id nulo para Categoria.');
        }

        const categoria = await this.getById(id);
        categoria.isActive = false;

        try {
            await this.repository.save(categoria);
        } catch (error) {
            throw new InternalServerErrorException('Erro ao inativar Categoria');
        }

    }
}
