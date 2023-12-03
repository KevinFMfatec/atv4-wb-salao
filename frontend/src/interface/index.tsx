interface ICliente {
    cliente_id: number,
    cliente_nome: string,
    cliente_nomeSocial: string,
    cliente_genero: string
    rg: IRG[];
    cpf: ICPF;
    telefones: ITell[];
    servicos: IServico[];
    produtos: IProduto[];
}
interface IRG {
    rg_id: number;
    rg_valor: string,
    rg_dataEmissao: string,
}
interface ICPF {
    cpf_valor: string,
    cpf_id: number,
    cpf_dataEmissao: string
}
interface ITell {
    telefone_ddd: string,
    telefone_id: number,
    telefone_numero: string
}
interface IServico {
    servico_id: number,
    servico_nome: string,
    servico_valor: number
}
interface IProduto {
    produto_id: number,
    produto_nome: string,
    produto_valor: number
}
export default ICliente;