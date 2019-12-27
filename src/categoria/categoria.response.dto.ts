import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";


export class CategoriaResponseDto{
    @ApiProperty({
        description: 'ID da categoria'
    })
    id: number;

    @ApiProperty({
        description: 'Descrição da categoria'
    })
    description: string;
}