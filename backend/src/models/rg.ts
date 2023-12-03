import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { cliente } from "./cliente";

@Entity()
export class RG {
    @PrimaryGeneratedColumn({ type: "int" })
    rg_id!: Number
    
    @Column({
        type:"varchar",
        length: 14
    })
    rg_valor!: String

    @Column({
        type:"varchar"
    })
    rg_dataEmissao!: String

    @ManyToOne(() => cliente, (cliente) => cliente.rg)
    @JoinColumn({
        name:"cliente"
    })
    cliente!: cliente
}