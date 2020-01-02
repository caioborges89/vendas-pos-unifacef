import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { Produto } from './produto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaService } from 'src/categoria/categoria.service';
import { Categoria } from 'src/categoria/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produto, Categoria])],
  providers: [ProdutoService, CategoriaService],
  controllers: [ProdutoController]
})
export class ProdutoModule {}
