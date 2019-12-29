import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Pedido } from 'src/pedido/pedido.entity';

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    nome: string;

    @Column({ length: 14, unique: true })
    cpfcnpj: string;

    @Column({ length: 100, unique: true })
    email: string;

    @Column({ length: 20 })
    senha: string;

    @Column({ default: true })
    isActive: boolean;
    
    @OneToMany(type => Pedido, pedido => pedido.cliente)
    pedidos: Pedido[];
}
