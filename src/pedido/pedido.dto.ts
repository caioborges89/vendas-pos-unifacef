import { ApiProperty } from "@nestjs/swagger";

interface ProdutoRequestDto {
    id: number; // ID do produto
    quantidade: number; // qtd do produto na venda
}

interface ClienteResponseDto {
    id: number; // ID do cliente
    nome: string; // Nome do cliente
    cpfcnpj: string; // CPF ou CNPJ do cliente
}

interface ProdutoResponseDto {
    id: number; // ID do produto
    descricao: string; // descrição do produto
    quantidade: number; // qtd em estoque
    valor: number; // valor original do produto
}

export interface ItemPedidoResponseDto {
    id: number; // ID do item do pedido
    quantidade: number; // qtd do produto na venda
    valor: number; // valor do produto na venda
    produto: ProdutoResponseDto;
}

export class PedidoQueryDto {
    @ApiProperty({
        description: 'ID do cliente',
        example: 2020,
        required: false
    })
    idCliente?: number;
}

export class PedidoRequestDto {
    @ApiProperty({
        description: 'ID do cliente',
        example: 2020
    })
    idCliente: number;

    @ApiProperty({
        description: 'Lista de produtos',
        example: [{
            id: 10214,
            quantidade: 5
        }]
    })
    produtos: Array<ProdutoRequestDto>;
}

export class PedidoResponseDto {
    @ApiProperty({
        description: 'ID do pedido',
        example: 900
    })
    id: number;
    
    @ApiProperty({
        description: 'Valor total do pedido',
        example: 38.97
    })
    valor: number;

    @ApiProperty({
        type: String,
        format: 'date-time',
        description: 'Data do pedido',
        example: '2019-10-22T15:20:32.232Z'
    })
    data: Date;

    @ApiProperty({
        description: 'Dados do cliente',
        example: {
            id: 2020,
            nome: 'João',
            cpfcnpj: '12345678912'
        }
    })
    cliente: ClienteResponseDto;

    @ApiProperty({
        description: 'Lista de produtos',
        example: [{
            id: 901,
            quantidade: 3,
            valor: 12.99,
            produto: {
                id: 10214,
                descricao: 'Ferro de passar',
                quantidade: 50,
                valor: 10.50
            }
        }]
    })
    produtos: Array<ItemPedidoResponseDto>;
}