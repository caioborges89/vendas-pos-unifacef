import { ApiProperty } from "@nestjs/swagger";

export class ProdutoRequestDto{
    @ApiProperty({
        description: 'ID do produto'
    })
    id: number;

    @ApiProperty({
        description: 'Descrição do produto'
    })
    description: string;

    @ApiProperty({
        description: 'Quantidade do produto em estoque'
    })
    quantity: number;

    @ApiProperty({
        description: 'Preço do produto'
    })
    cost: number;

    @ApiProperty({
        description: 'Categoria do produto'
    })
    category: number;
    
}