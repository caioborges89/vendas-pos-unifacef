import { ApiProperty } from "@nestjs/swagger";

export class ClienteRequestDTO {
    @ApiProperty({
        description: 'Nome Cliente/Usuário',
        minLength: 3,
        maxLength: 100,
        required:true
    })
    nome: string;
    @ApiProperty({
        description: 'CPF ou CNPJ Cliente/Usuário',
        minLength: 11,
        maxLength: 14,
        required:true
    })
    cpfcnpj: string;
    @ApiProperty({
        description: 'E-Mail Cliente/Usuário',
        minLength: 3,
        maxLength: 100,
        required:true
    })
    email: string;
    @ApiProperty({
        description: 'Senha Cliente/Usuário',
        minLength: 6,
        maxLength: 20,
        required:true
    })
    senha: string;

}