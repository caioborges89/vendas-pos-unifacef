import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Produto } from 'src/produto/produto.entity';

@Entity()
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    descricao: string;

    @Column({ default: true })
    isActive: boolean;
    
    @OneToMany(type => Produto, produto => produto.categoria)
    produtos: Produto[];
}
