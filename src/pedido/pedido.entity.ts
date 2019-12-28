import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
