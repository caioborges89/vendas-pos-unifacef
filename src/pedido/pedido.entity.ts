import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { ItemPedido } from './item-pedido.entity';
import { Cliente } from 'src/cliente/cliente.entity';

@Entity()
export class Pedido {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    idCliente: number;    

    @Column({ type: 'decimal', precision: 9, scale: 2, default: 0 })
    valor: number;

    @Column()
    data: Date;
    
    @OneToMany(type => ItemPedido, item => item.pedido)
    itens: ItemPedido[];
    
    @ManyToOne(type => Cliente, cliente => cliente.pedidos)
    @JoinColumn({name: 'idCliente', referencedColumnName: 'id'})
    cliente: Cliente;
}
