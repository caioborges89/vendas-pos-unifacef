import { ApiProperty } from "@nestjs/swagger";
import { CategoriaResponseDto } from "src/categoria/categoria.response.dto";

export class ProdutoResponseDto{
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
    category: CategoriaResponseDto;

    @ApiProperty({
        description: 'Produto ativa ou inativo na base de dados'
    })
    isActive: boolean;
}