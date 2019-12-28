import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Produto')
@Controller('produto')
export class ProdutoController {}
