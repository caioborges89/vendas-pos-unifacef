import { ApiProperty } from "@nestjs/swagger";

export class AuthenticationResponseDTO{
    @ApiProperty({
        description: 'Token'
    })
    token: string;
}