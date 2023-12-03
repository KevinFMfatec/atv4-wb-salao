/* eslint-disable react/jsx-pascal-case */
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import NavBar_ from '../../../component/NavBar'
import { service } from '../../../service/serve';
import { useForm } from 'react-hook-form';
import './styles.css'

interface CadastroCliente {
    cliente_nome: string;
    cliente_nomeSocial: string;
    cliente_genero: string;
    cpf_valor: string;
    cpf_dataEmissao: string;
    rg_valor: string;
    rg_dataEmissao: string;
    telefone: string;
}
function CadastrarClientes() {
    const navigate = useNavigate();
    const clienteRegister = useCallback(
        async (data: CadastroCliente) => {
            await service
                .post<CadastroCliente>(
                    'cliente/criar-cliente',
                    {
                        cliente_nome: data.cliente_nome,
                        cliente_nomeSocial: data.cliente_nomeSocial,
                        cliente_genero: data.cliente_genero,
                        cpf_valor: data.cpf_valor,
                        cpf_dataEmissao: data.cpf_dataEmissao,
                        rg_valor: data.rg_valor,
                        rg_dataEmissao: data.rg_dataEmissao,
                        telefones: [{
                            telefone_ddd: data.telefone.split(' ')[0],
                            telefone_numero: data.telefone.split(' ')[1],
                        }]
                    }
                )
                .then(({ data }) => {
                    console.log(data);
                    navigate('/clientes');
                })
                .catch(error => {
                    console.log(error);
                });
        },
        [],
    )
    const onSubmit = useCallback(
        async (data: CadastroCliente) => {
            clienteRegister(data)
        }, [clienteRegister]
    )

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CadastroCliente>({
        mode: 'onBlur',
    });
    return (
        <section>
            <header>
                <NavBar_ />
            </header>
            <main>
                <h1>Cadastrar Cliente</h1>
                <div className="forms">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="field">
                            <label htmlFor="Nome">Nome Completo:</label>
                            <input type="text" {...register('cliente_nome')} />
                        </div>
                        {/* <div className="field">
                            <label htmlFor="Sobrenome">Sobrenome:</label>
                            <input type="text" />
                        </div> */}
                        <div className="field">
                            <label htmlFor="Social">Nome social:</label>
                            <input type="text" {...register('cliente_nomeSocial')} />
                        </div>
                        <div className="field">
                            <label htmlFor="Genero">Gênero:</label>
                            <select id="genero" {...register('cliente_genero')}>
                                <option>"Selecione seu gênero"</option>
                                <option>Feminino</option>
                                <option>Masculino</option>
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="cpf">CPF:</label>
                            <input type="text" {...register('cpf_valor')} />
                        </div>
                        <div className="field">
                            <label htmlFor="cpf">CPF data de emissao:</label>
                            <input type="text" {...register('cpf_dataEmissao')} />
                        </div>
                        <div className="field">
                            <label htmlFor="rg">RG:</label>
                            <input type="text" {...register('rg_valor')} />
                        </div>
                        <div className="field">
                            <label htmlFor="cpf">RG data de emissao:</label>
                            <input type="text" {...register('rg_dataEmissao')} />
                        </div>
                        <div className="field">
                            <label htmlFor="Telefone">Telefone:</label>
                            <input placeholder='XX XXXXXXXX' type="text"{...register('telefone')} />
                        </div>
                        <Button className="submit" variant="outline-dark" type='submit'>Cadastrar</Button>{' '}
                    </form>
                </div>
            </main>
        </section>
    );
}

export default CadastrarClientes;