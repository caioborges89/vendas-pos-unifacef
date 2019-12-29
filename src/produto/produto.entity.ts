import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { ItemPedido } from 'src/pedido/item-pedido.entity';
import { Categoria } from 'src/categoria/categoria.entity';

@Entity()
export class Produto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    descricao: string;    

    @Column({ precision: 7, default: 0 })
    quantidade: number; // qtd no estoque

    @Column({ type: 'decimal', precision: 7, scale: 2, default: 0 })
    valor: number;

    @Column()
    idCategoria: number;
    
    @OneToMany(type => ItemPedido, item => item.produto)
    pedidos: ItemPedido[];
    
    @ManyToOne(type => Categoria, categoria => categoria.produtos)
    @JoinColumn({name: 'idCategoria', referencedColumnName: 'id'})
    categoria: Categoria;
}
