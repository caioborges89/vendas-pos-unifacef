import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";


export class CategoriaResponseDto{
    @ApiProperty({
        description: 'ID da categoria'
    })
    id: number;

    @ApiProperty({
        description: 'Descrição da categoria'
    })
    descricao: string;

    @ApiProperty({
        description: 'Categoria ativa ou inativa na base de dados'
    })
    isActive: boolean;
}