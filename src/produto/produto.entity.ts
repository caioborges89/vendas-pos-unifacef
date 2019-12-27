import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Produto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    descricao: string;    

    @Column()
    quantidade: number;

    @Column()
    valor: number;

    @Column()
    idCategoria: number;
}
