import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    nome: string;

    @Column({ length: 14, unique: true })
    cpfCnpj: string;

    @Column({ length: 100 })
    email: string;

    @Column({ length: 20 })
    senha: string;
}
