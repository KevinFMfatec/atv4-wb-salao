import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CPF } from "./cpf";
import { empresa } from "./empresa";
import { produtos } from "./produto";
import { RG } from "./rg";
import { servicos } from "./servico";
import { telefone } from "./telefone";

@Entity()
export class cliente {
    @PrimaryGeneratedColumn({ type: "int" })
    cliente_id!: Number

    @Column({
        type: "varchar"
    })
    cliente_genero!: String
    @Column({
        type: "varchar"
    })
    cliente_nome!: String

    @Column({
        type: "varchar"
    })
    cliente_nomeSocial!: String
    @CreateDateColumn({
        type: "datetime"
    })
    cliente_dataCadastro!: Date

    @OneToOne(() => CPF, (cpf) => cpf.cliente)
    cpf!: CPF
    @OneToMany(() => RG, (rg) => rg.cliente)
    rg!: RG
    @OneToMany(() => telefone, (telefones) => telefones.cliente)
    telefones!: telefone
    @ManyToMany(() => produtos, (produtos) => produtos.cliente)
    produtos!: produtos[]
    @ManyToMany(() => servicos, (servicos) => servicos.cliente)
    @JoinTable({
        name: "servico_cliente"
    })
    servicos!: produtos[]
    @ManyToMany(() => empresa, (empresa) => empresa.cliente)
    empresa!: empresa[]

}