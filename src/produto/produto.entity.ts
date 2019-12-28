import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Produto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    descricao: string;    

    @Column()
    quantidade: number; // qtd no estoque

    @Column({ type: 'decimal', precision: 7, scale: 2, default: 0 })
    valor: number;

    @Column()
    idCategoria: number;
}
