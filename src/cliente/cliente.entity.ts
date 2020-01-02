import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Pedido } from 'src/pedido/pedido.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Cliente {
    @ApiProperty({
        description: 'ID do cliente'
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: 'Nome'
    })
    @Column({ length: 100 })
    nome: string;

    @ApiProperty({
        description: 'CPF/CNPJ'
    })
    @Column({ length: 14, unique: true })
    cpfcnpj: string;

    @ApiProperty({
        description: 'E-Mail'
    })
    @Column({ length: 100, unique: true })
    email: string;

    @ApiProperty({
        description: 'Senha'
    })
    @Column({ length: 20 })
    senha: string;

    @ApiProperty({
        description: 'Ativo'
    })
    @Column({ default: true })
    isActive: boolean;
    
    @OneToMany(type => Pedido, pedido => pedido.cliente)
    pedidos: Pedido[];
}
