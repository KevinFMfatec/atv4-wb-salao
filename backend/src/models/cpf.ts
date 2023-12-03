import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { cliente } from "./cliente";

@Entity()
export class CPF {
    @PrimaryGeneratedColumn({ type: "int" })
    cpf_id!: Number

    @Column({
        type:"varchar",
        length: 14
    })
    cpf_valor!: String

    @Column({
        type:"varchar"
    })
    cpf_dataEmissao!: String

    @OneToOne(() => cliente, (cliente) => cliente.cpf)
    @JoinColumn({
        name:"cliente"
    })
    cliente!: cliente
}