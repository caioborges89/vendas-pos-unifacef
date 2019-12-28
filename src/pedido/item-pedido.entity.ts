import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Produto } from 'src/produto/produto.entity';

@Entity()
export class ItemPedido {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()    
    idPedido: number;

    @Column()
    idProduto: number;    

    @Column({ precision: 7, default: 0 })
    quantidade: number;

    @Column({ type: 'decimal', precision: 7, scale: 2, default: 0 })
    valor: number;
    
    @ManyToOne(type => Pedido, pedido => pedido.itens)
    @JoinColumn({name: 'idPedido', referencedColumnName: 'id'})
    pedido: Pedido;
    
    @ManyToOne(type => Produto, produto => produto.pedidos)
    @JoinColumn({name: 'idProduto', referencedColumnName: 'id'})
    produto: Produto;
}
