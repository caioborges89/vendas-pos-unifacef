import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './pedido.entity';
import { PedidoRequestDto, PedidoResponseDto, ItemPedidoResponseDto } from './pedido.dto';
import { ItemPedido } from './item-pedido.entity';
import { Cliente } from 'src/cliente/cliente.entity';
import { Produto } from 'src/produto/produto.entity';

interface GetPedidoRequestDto {
    id?: number;
    idCliente?: number;
}

@Injectable()
export class PedidoService {
    constructor(
        @InjectRepository(Pedido)
        private readonly pedidoRepository: Repository<Pedido>,
        @InjectRepository(ItemPedido)
        private readonly itemPedidoRepository: Repository<ItemPedido>,
        @InjectRepository(Cliente)
        private readonly clienteRepository: Repository<Cliente>,
        @InjectRepository(Produto)
        private readonly produtoRepository: Repository<Produto>,
    ) { }

    async get(request?: GetPedidoRequestDto): Promise<PedidoResponseDto[]> {
        const pedidos = await this.pedidoRepository.find(request);
        if (pedidos.length === 0) {
            throw new NotFoundException('Nenhum pedido foi encontrado');
        }

        const pedidosDto = Array<PedidoResponseDto>();

        for (const pedido of pedidos) {
            const itens = await this.itemPedidoRepository.find({ idPedido: pedido.id });
            const cliente = await this.clienteRepository.findOne(pedido.idCliente);

            const produtosDto = Array<ItemPedidoResponseDto>();

            for (const item of itens) {
                const produto = await this.produtoRepository.findOne(item.idProduto);

                produtosDto.push({
                    id: item.id,
                    quantidade: item.quantidade,
                    valor: item.valor,
                    produto: {
                        id: produto.id,
                        descricao: produto.descricao,
                        quantidade: produto.quantidade,
                        valor: produto.valor
                    }   
                });
            }

            pedidosDto.push({
                id: pedido.id,
                valor: pedido.valor,
                data: pedido.data,
                cliente: {
                    id: cliente.id,
                    nome: cliente.nome,
                    cpfCnpj: cliente.cpfCnpj
                },
                produtos: produtosDto
            });
        }

        return pedidosDto;
    }

    async details(id: number): Promise<PedidoResponseDto> {
        if (!id) {
            throw new BadRequestException('O ID do pedido está inválido');
        }
        
        return (await this.get({ id }))[0];
    }

    async create(request: PedidoRequestDto): Promise<PedidoResponseDto> {
        if (!request || !request.idCliente || !request.produtos || request.produtos.length === 0) {
            throw new BadRequestException('Os dados de requisição estão inválidos');
        }

        // Validar cliente
        const cliente = await this.clienteRepository.findOne(request.idCliente);
        if (!cliente) {
            throw new NotFoundException(`O cliente ${request.idCliente} não foi encontrado`);
        }

        // Validar produtos
        let valorPedido: number = 0;
        for (const item of request.produtos) {
            const produto = await this.produtoRepository.findOne(item.id);
            
            if (!produto) {
                throw new NotFoundException(`O produto ${item.id} não foi encontrado`);
            }

            if (produto.quantidade < item.quantidade) {
                throw new BadRequestException(`O produto ${produto.id} possui apenas ${produto.quantidade} peça(s) em estoque`);
            }

            valorPedido += (item.quantidade * produto.valor);
        }

        try {
            // Salvar a cabeça do pedido
            const pedido: Pedido = await this.pedidoRepository.save({
                id: null,
                idCliente: request.idCliente,
                data: new Date(),
                valor: valorPedido
            });

            for (const item of request.produtos) {
                // Alterar o estoque do produto
                const produto = await this.produtoRepository.findOne(item.id);
                produto.quantidade = produto.quantidade - item.quantidade;
                await this.produtoRepository.save(produto);

                // Salvar item do pedido
                await this.itemPedidoRepository.save({
                    id: null,
                    idPedido: pedido.id,
                    idProduto: item.id,
                    quantidade: item.quantidade,
                    valor: produto.valor
                });
            }

            return await this.details(pedido.id);
        } catch (error) {
            throw new InternalServerErrorException(`Ocorreu um erro ao gravar os dados do pedido: ${error}`);
        }
    }

    async update(id: number, request: PedidoRequestDto): Promise<PedidoResponseDto> {
        if (!id || !request) {
            throw new BadRequestException('Os dados de requisição estão inválidos');
        }

        // Validar pedido
        const pedido = await this.pedidoRepository.findOne(id);
        if (!pedido) {
            throw new NotFoundException(`O pedido ${id} não foi encontrado`);
        }

        // Alterar o cliente
        if (request.idCliente) {
            const cliente = await this.clienteRepository.findOne(request.idCliente);
            if (!cliente) {
                throw new NotFoundException(`O cliente ${request.idCliente} não foi encontrado`);
            }

            pedido.idCliente = request.idCliente;
        }

        // Validar produtos
        if (request.produtos && request.produtos.length > 0) {
            pedido.valor = 0;

            for (const item of request.produtos) {
                const produto = await this.produtoRepository.findOne(item.id);

                if (!produto) {
                    throw new NotFoundException(`O produto ${item.id} não foi encontrado`);
                }

                if (produto.quantidade < item.quantidade) {
                    throw new BadRequestException(`O produto ${produto.id} possui apenas ${produto.quantidade} peça(s) em estoque`);
                }
    
                pedido.valor += (item.quantidade * produto.valor);
            }
        }

        try {
            // Atualizar a cabeça do pedido
            await this.pedidoRepository.update({ id: pedido.id }, pedido);
            
            // Atualizar produtos
            if (request.produtos && request.produtos.length > 0) {
                // Voltar o estoque dos produtos do pedido
                const items = await this.itemPedidoRepository.find({ idPedido: pedido.id });
                for (const item of items) {
                    const produto = await this.produtoRepository.findOne(item.idProduto);
                    if (produto) {
                        produto.quantidade = produto.quantidade + item.quantidade;
                        await this.produtoRepository.save(produto);
                    }
                }

                // Deletar os itens do pedido
                await this.itemPedidoRepository.delete({
                    idPedido: pedido.id
                });

                // Adicionar novos itens ao pedido
                for (const item of request.produtos) {
                    const produto = await this.produtoRepository.findOne(item.id);
                    if (produto) {
                        produto.quantidade = produto.quantidade - item.quantidade;
                        await this.produtoRepository.save(produto);
                    }

                    await this.itemPedidoRepository.save({
                        id: null,
                        idPedido: pedido.id,
                        idProduto: produto.id,
                        quantidade: item.quantidade,
                        valor: produto.valor
                    });
                }
            }

            return await this.details(pedido.id);
        } catch (error) {
            throw new InternalServerErrorException(`Ocorreu um erro ao atualizar os dados do pedido: ${error}`);
        }
    }

    async destroy(id: number): Promise<void> {
        if (!id) {
            throw new BadRequestException('O ID do pedido está inválido');
        }

        // Validar pedido
        const pedido = await this.pedidoRepository.findOne(id);
        if (!pedido) {
            throw new NotFoundException(`O pedido ${id} não foi encontrado`);
        }

        try {
            const itens = await this.itemPedidoRepository.find({
                idPedido: id
            });

            // Voltar o estoque do produto e deletar os itens do pedido
            for (const item of itens) {
                const produto = await this.produtoRepository.findOne(item.idProduto);

                if (produto) {
                    produto.quantidade = produto.quantidade + item.quantidade;
                    await this.produtoRepository.save(produto);
                }

                await this.itemPedidoRepository.delete(item);
            }

            // Deletar a cabeça do pedido
            await this.pedidoRepository.delete(pedido);
        } catch (error) {
            throw new InternalServerErrorException(`Ocorreu um erro ao deletar os dados do pedido: ${error}`);
        }
    }
}
