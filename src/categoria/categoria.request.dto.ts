import { ApiProperty } from "@nestjs/swagger";

export class CategoriaRequestDto{
    @ApiProperty({
        description: 'Descrição da categoria'
    })
    descricao: string;
}