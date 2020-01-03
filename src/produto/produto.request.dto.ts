import { ApiProperty } from "@nestjs/swagger";

export class ProdutoQueryDto{
    @ApiProperty({
        description: 'ID da categoria',
        example: 1,
        required: false
    })
    idCategoria?: number;

    @ApiProperty({
        description: 'Descrição do produto',
        example: "celular",
        required: false
    })
    descricao?: string;
}

export class ProdutoRequestDto{
    @ApiProperty({
        description: 'Descrição do produto'
    })
    descricao: string;

    @ApiProperty({
        description: 'Quantidade do produto em estoque'
    })
    quantidade: number;

    @ApiProperty({
        description: 'Preço do produto'
    })
    valor: number;

    @ApiProperty({
        description: 'Categoria do produto'
    })
    idCategoria: number;
}