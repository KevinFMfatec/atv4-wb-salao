import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { cliente } from "./cliente";
import { empresa } from "./empresa";

@Entity()
export class servicos {
    @PrimaryGeneratedColumn({ type: "int" })
    servico_id!: Number
    @Column({
        type: "varchar"
    })
    servico_nome!: String
    @Column({
        type: "float"
    })
    servico_valor!: Number
    @ManyToMany(() => cliente, (cliente) => cliente.servicos)
    cliente!: cliente[]
    @ManyToMany(() => empresa, (empresa) => empresa.servicos)
    empresa!: empresa[]
}