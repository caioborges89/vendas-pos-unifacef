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
    categoria: CategoriaResponseDto;

    @ApiProperty({
        description: 'Produto ativa ou inativo na base de dados'
    })
    isActive: boolean;
}