import { Column, Entity, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@Entity()
export class ItemPedido {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()    
    idPedido: number;

    @Column()
    idProduto: number;    

    @Column()
    quantidade: number;

    @Column({ type: 'decimal', precision: 7, scale: 2, default: 0 })
    valor: number;  
}
