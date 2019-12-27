import { ApiProperty } from "@nestjs/swagger";

export class CategoriaRequestDto{
    @ApiProperty({
        description: 'ID da categoria'
    })
    id: number;

    @ApiProperty({
        description: 'Descrição da categoria'
    })
    description: string;
}