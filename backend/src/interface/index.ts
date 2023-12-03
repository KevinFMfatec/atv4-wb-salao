export interface ICliente {
    cliente_id: number;
    cliente_nome: string;
    cliente_genero: String;
    cliente_nomeSocial: String;
    cliente_dataCadastro: Date;
    cpf: ICpf;
    rg: IRg[];
    telefones: ITelefone[];
    produtos: IProdutos[];
    servicos: IServicos[];
    empresa: IEmpresa[]
}

export interface ICpf {
    cpf_id: Number;
    cpf_valor: String;
    cpf_dataEmissao: String;
}
export interface IRg{ 
    rg_id: Number;
    rg_valor: String;
    rg_dataEmissao: String;
}
export interface ITelefone{
    telefone_id: number;
    telefone_ddd: string;
    telefone_numero: string;
}
export interface IProdutos{
    produto_id: number;
    produto_nome: string;
    produto_valor: string;
}
export interface IServicos{
    servico_id: number;
    servico_nome: string;
    servico_valor: string;
}
export interface IEmpresa{
    empresa_id: number;
    empresa_nome: String;
}