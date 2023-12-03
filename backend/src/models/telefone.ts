import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { cliente } from "./cliente";

@Entity()
export class telefone {
    @PrimaryGeneratedColumn({ type: "int" })
    telefone_id!: Number

    @Column({
        type:"varchar"
    })
    telefone_ddd!: String

    @Column({
        type:"varchar"
    })
    telefone_numero!: String

    @ManyToOne(() => cliente, (cliente) => cliente.telefones)
    @JoinColumn({
        name:"cliente"
    })
    cliente!: cliente
}