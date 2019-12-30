import { Module } from '@nestjs/common';
import { ClienteModule } from './cliente/cliente.module';
import { CategoriaModule } from './categoria/categoria.module';
import { ProdutoModule } from './produto/produto.module';
import { PedidoModule } from './pedido/pedido.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria/categoria.entity';
import { Cliente } from './cliente/cliente.entity';
import { Pedido } from './pedido/pedido.entity';
import { ItemPedido } from './pedido/item-pedido.entity';
import { Produto } from './produto/produto.entity';
import { AuthenticationModule } from './auth/authentication.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3310,
    username: 'root',
    password: 'root',
    database: 'vendas-pos-graduacao',
    entities: [Categoria, Cliente, Pedido, ItemPedido, Produto],
    synchronize: true,
  }),
    ClienteModule, CategoriaModule, ProdutoModule, PedidoModule, AuthenticationModule]
})
export class AppModule { }
