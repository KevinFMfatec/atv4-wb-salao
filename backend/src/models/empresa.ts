import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { cliente } from "./cliente";
import { produtos } from "./produto";
import { servicos } from "./servico";

@Entity()
export class empresa {
    @PrimaryGeneratedColumn({ type: "int" })
    empresa_id!: Number

    @Column({
        type: "varchar"
    })
    empresa_nome!: string;
    @ManyToMany(() => cliente, (cliente) => cliente.empresa)
    @JoinTable({
        name: "empresa_cliente"
    })
    cliente!: cliente[]
    @ManyToMany(() => servicos, (servicos) => servicos.empresa)
    @JoinTable({
        name: "empresa_servico"
    })
    servicos!: servicos[]
    @ManyToMany(() => produtos, (produtos) => produtos.empresa)
    @JoinTable({
        name: "empresa_produto"
    })
    produtos!: produtos[]
}