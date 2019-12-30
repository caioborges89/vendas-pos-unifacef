import { ApiProperty } from "@nestjs/swagger";

export class AuthenticationRequestDTO {
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