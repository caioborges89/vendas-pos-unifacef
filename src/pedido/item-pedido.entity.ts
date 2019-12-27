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
    sequencia: number;  

    @Column()
    valorProduto: number;  
}
