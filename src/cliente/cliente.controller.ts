import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cliente')
@Controller('cliente')
export class ClienteController {}
