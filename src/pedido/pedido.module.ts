import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemPedido } from './item-pedido.entity';
import { Pedido } from './pedido.entity';
import { Produto } from 'src/produto/produto.entity';
import { Cliente } from 'src/cliente/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, ItemPedido, Cliente, Produto])],
  providers: [PedidoService],
  controllers: [PedidoController]
})
export class PedidoModule {}
