import { Controller, HttpStatus, Post, HttpCode, Body } from "@nestjs/common";
import { ApiTags, ApiCreatedResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse } from "@nestjs/swagger";
import { AuthenticationService } from "./authentication.service";
import { AuthenticationRequestDTO } from "./authentication.request.dto";
import { AuthenticationResponseDTO } from "./authentication.response.dto";

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService
    ) {}

    @Post('/login')
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
        description: 'Login',
        type: AuthenticationResponseDTO,
        isArray:false
    })
    @ApiNotFoundResponse({
        description: 'Não encontrado'
    })
    @ApiBadRequestResponse({
        description: 'Requisição inválida'
    })
    @ApiInternalServerErrorResponse({
        description: 'Erro inesperado'
    })
    login(@Body() authenticationRequestDTO:AuthenticationRequestDTO) {
        return this.authenticationService.login(authenticationRequestDTO);
    }
}